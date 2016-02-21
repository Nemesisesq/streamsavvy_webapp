# Created by Nem at 2/21/16
Feature: API Fature
  In this feature we test the various view functions of the api

  Scenario: testing the search API
    Given a request for orange
    When we search queryset for orange
    Then we get a list