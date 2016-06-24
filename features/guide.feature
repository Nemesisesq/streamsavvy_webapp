# Created by Nem at 3/19/16
Feature: Guide test
  We test the guide functionality, the search and retrival of a

  @rest_api
#  @real_db
  Scenario: Test the retrival of a grid for a zip_code
    Given a zip_code
      | zip   |
      | 43209 |
      | 10583 |

    When we call the get method on RoviChannelGrid
    Then we get a grid

  Scenario: Test the retrival of network name for a call sign

    Given the call sign
      | call_sign |
      | WABC      |
    When I call the service for the network
    Then There is a CallSign objet that matched <call_sign>



