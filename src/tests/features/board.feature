@board
Feature: Board

  Background:
    Given Login on Trello Page
    And the board Trello page
    
  @listandcards @positive
  Scenario: Successfully creates a list  
    When create a new list
    Then the new list its at the end of the lists
    Then logout from trello

  @listandcards @positive
  Scenario: Successfully create a new card
    When create a new card in the first list
    Then the new card its at the end of the card list
    Then logout from trello

  @listandcards @positive
  Scenario: Delete the first card of the first list
    When delete the first card
    Then the card deleted does not exist in the list
    Then logout from trello

  @member @positive
  Scenario: Successfully shares board with another member
    When add a new member
    Then the new member is in the list
    Then logout from trello

  @member @negative
  Scenario: Displays error when adding a new member
    When add new member with wrong email
    Then the error is display
    Then logout from trello



