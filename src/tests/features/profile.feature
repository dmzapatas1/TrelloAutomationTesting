Feature: Profile
  Scenario: Successfully edits profile username
    Given the profile page
    When enter a unique profile username "<username>"
    Then the new username appears in the url

    Examples:
      | username     |
      | danielatest_ |

  Scenario: Fails to edit profile with duplicate username
    Given the profile page
    When enter a duplicate profile username "<username>"
    Then an error message should be displayed

    Examples:
      | username |
      | daniela  |