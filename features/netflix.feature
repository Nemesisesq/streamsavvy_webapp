# Created by Nem at 5/5/16
Feature: Netflix Feature
  We test the checking of netflix shows

  @real_db
  Scenario: test inital netflix check
    Given run inital netflix check

  Scenario: test crawling of netflix links
    Given the netflixable website url
    When we get a response
    Then we pull the update links
    Then we save the links