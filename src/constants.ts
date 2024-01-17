/**
 * The version of GitHub's REST API to use.
 * @see https://docs.github.com/en/rest/about-the-rest-api/api-versions 
 */
export const API_VERSION = '2022-11-28';

/**
 * The list of repositories to run checks against
 * @see https://docs.github.com/en/get-started/quickstart/github-glossary#repository
 */
export const REPOSITORIES: Array<{owner: string, repo: string}> = [
  { owner: 'FIXME', repo: 'FIXME' },
];