Feature: Create a new form

  As an editor
  I want to quickly create a form
  So that I can use the form in user testing

  Scenario: Create a list of questions
    Given I have access to the form builder
    When I list my questions
    Then I should see my form
