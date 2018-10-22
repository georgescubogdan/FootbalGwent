# Team EtOH

# How to contribute to the repo?
Make a branch and make 1 commit per issue (more if the same code solved more 
than one issue), but not all commits need issues (make interfaces first if 
needed then implement them).
After you fixed the issues that you intended for a specific branch,
you will have to start a new Pull Request and assign someone to review it.
After the reviewing phase, if the branch is accepted, it will be merged with 
the 'master' branch.
If another branch was merged previously you will have to rebase your current
branch on 'origin/master', then force push.

    !!!! Avoid working on random branches that you did not create !!! 
# Branch naming convention
Naming branches can be hard work so to make it easy we can use this pattern:
feature -> "feature/some_suggestive_words"
fix -> "fix/more_suggestive_words"

# Commit name/message convention
A good description of what the commit is all about in around 10 words.
It should refer all issues (if solving some). Referring an issue is done like this:
 <commit message> fix #ISSUE_NR <commit message>
 
# Labels meaning
 * BL - business logic
 * UI - user interface
 * UX - user experience
 * DB - data base
 * PLow - priority low
 * PMedium- priority medium
 * PHigh - priority high
 * UTest - unit test and mock data
 * Refactor
 * Feature