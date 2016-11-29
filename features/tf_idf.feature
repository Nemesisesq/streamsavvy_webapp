# Created by Nem at 11/28/16
Feature: This Feature describes tests for Term Frequency - Inverse Document Frequency recomendation engine

  Scenario: Test tf_idf recommendation engine.
    Given our content engine
    When  we train our content engine
    Then We make a prediction

  Scenario: Test Predictor
    Given our content engine
    When  We make a prediction
