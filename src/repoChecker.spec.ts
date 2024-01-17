import { describe, expect, test } from 'vitest'
import { REPOSITORIES } from './constants'
import {
  isBranchProtected,
  isBranchProtectedAdminEnforced,
  isPRRequiredBeforeMerging,
  isStatusCheckRequiredBeforeMerging,
} from './repoChecker'

describe.each(REPOSITORIES)('$repo repository is configured properly', ({owner, repo: repoName}) => {
  test("should have branch protection enabled on 'main'", async () => {
    expect (await isBranchProtected(owner, repoName, 'main')).toBe(true);
  })

  test("should have disallow admins to bypass branch protection rules on 'main'", async () => {
    expect (await isBranchProtectedAdminEnforced(owner, repoName, 'main')).toBe(true);
  })

  test("should require pull requests before merging to 'main'", async () => {
    expect (await isPRRequiredBeforeMerging(owner, repoName, 'main')).toBe(true);
  })

  test("should have require status checks to pass before merging to 'main'", async () => {
    expect (await isStatusCheckRequiredBeforeMerging(owner, repoName, 'main')).toBe(true);
  })

})