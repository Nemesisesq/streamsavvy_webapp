# Created by Nem at 7/1/15
Feature: Package feature
  This is to test the getting and saving of content


  Scenario: Saving show to a package
    Given a user nem01
    When content is added to its package
    Then its content list should increase