# Created by Nem at 8/19/15
Feature: This is test the facilitation methods that add pricing for services

  Scenario: Adding Prices
    Given a yaml file provider_prices
    When I process the yaml file
    Then it should populate prices