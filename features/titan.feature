# Created by Nem at 1/28/16
Feature: Titan
  we are testing the crawling, parsing, and storing of guide data from titan

  Scenario: Getting and saving shows from Titan
    Given a titan crawler
    When we crawl titan
    Then we find shows