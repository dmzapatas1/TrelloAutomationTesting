@login
Feature: Login to Trello
Background:
 Given Open the Trello login page

  @negative
  Scenario: Login with invalid password
    When enter a valid email "<username>" and an invalid pass "<password>"
    Then an error message should be displayed under the password field

    Examples:
      | username                | password |
      | daniela_zapata@epam.com |  |

  @positive
  Scenario: Successfully login with valid credentials
    When enter a valid email "<username>" and a valid pass "<password>"
    Then should be successfully logged in

     Examples:
      | username                     | password |
      | danielazapata.test@gmail.com | 240216Te$t |

  