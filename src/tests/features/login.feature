@skip
Feature: Login to Trello

  Scenario: Login with invalid password
    Given the Trello login page
    When enter a valid email "<username>" and an invalid pass "<password>"
    Then an error message should be displayed

    Examples:
      | username                | password |
      | daniela_zapata@epam.com |  |

  Scenario: Successfully login with valid credentials
    Given the Trello login page
    When enter a valid email "<username>" and a valid pass "<password>"
    Then should be successfully logged in

     Examples:
      | username                     | password |
      | danielazapata.test@gmail.com | 240216Te$t |

  