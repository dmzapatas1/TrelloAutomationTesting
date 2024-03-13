Feature: Board

Background:
    Given the board page

  Scenario: Successfully creates a list  
    When create a new list
    Then the new list its at the end of the lists

  Scenario: Successfully create a new card
    When create a new card in the first list
    Then the new card its at the end of the card list

  Scenario: Delete the first card of the first list
    When delete the first card
    Then the card deleted does not exist in the list
