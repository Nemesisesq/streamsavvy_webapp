# Created by Nem at 8/14/15
Feature: YAML Test
  we test getting settings variables values from a yaml file in the root of the project

  Scenario: testing getting yaml files in the root of the projects

    Given a yaml file
    When it is loaded
    Then it gives expected variables