@profile
Feature: Profile
Background:
    Given Login on Trello Page
    And the profile page
  @positive
  Scenario: Successfully edits profile username
    When enter a unique profile username "<username>"
    Then the new username appears in the url
    Then logout from trello

    Examples:
      | username     |
      | danielatest_ |
  @negative
  Scenario: Fails to edit profile with duplicate username
    When enter a duplicate profile username "<username>"
    Then an error message should be displayed under the username field
    Then logout from trello

    Examples:
      | username |
      | daniela  |