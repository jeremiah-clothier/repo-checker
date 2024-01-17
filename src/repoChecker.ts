import { Octokit } from "@octokit/core"
import { API_VERSION } from "./constants";

/**
 * Checks if there are branch protection rules.
 */
export async function isBranchProtected(owner: string, repo: string, branch: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': API_VERSION
      },
    });

    return response.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Checks if admins can bypass branch protection rules
 */
export async function isBranchProtectedAdminEnforced(owner: string, repo: string, branch: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': API_VERSION
      },
    });

    return response.status === 200 && response.data.enabled;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Checks if there are branch protection rules.
 */
export async function isPRRequiredBeforeMerging(owner: string, repo: string, branch: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  try {
    const MIN_NUM_REQUIRED_REVIEWS = 1;
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': API_VERSION
      },
    });
    return response.status === 200
      && typeof response.data.required_approving_review_count === 'number'
      && response.data.required_approving_review_count >= MIN_NUM_REQUIRED_REVIEWS;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Checks if status checks are configured
 */
export async function isStatusCheckRequiredBeforeMerging(owner: string, repo: string, branch: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': API_VERSION
      },
    });
    return response.status === 200 && response.data.contexts.length > 0;
  } catch (e) {
    console.error(e);
    return false;
  }
}