/// <reference types="cypress" />

describe('Todo Auto Tests', () => {
  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/');
  });

  it('should add a new todo', () => {
    cy.get('.new-todo').type('Buy groceries{enter}');
    cy.get('.todo-list li').should('contain', 'Buy groceries');
  });

  it('should mark a todo as completed', () => {
    cy.get('.new-todo').type('Complete project{enter}');
    cy.get('.todo-list li .toggle').click();
    cy.get('.todo-list li').should('have.class', 'completed');
  });

  it('should delete a todo', () => {
    cy.get('.new-todo').type('Go for a walk{enter}');
    cy.get('.todo-list li').trigger('mouseover');
    cy.get('.destroy').click({ force: true });
    cy.get('.todo-list li').should('not.exist');
  });

  it('should edit an existing todo', () => {
    // Add a new todo
    cy.get('.new-todo').type('Read a book{enter}');

    // Double-click the todo label to enter edit mode
    cy.get('.todo-list li label').dblclick();

    // Clear the existing text and type new text
    cy.get('.todo-list li input[type="text"]')
      .clear()
      .type('Read two books{enter}');

    // Verify the todo is updated
    cy.get('.todo-list li').should('contain', 'Read two books');
  });

  it('should filter active todos', () => {
    cy.get('.new-todo').type('Task 1{enter}');
    cy.get('.new-todo').type('Task 2{enter}');
    cy.get('.todo-list li .toggle').first().click();
    cy.contains('Active').click();
    cy.get('.todo-list li').should('not.have.class', 'completed');
  });

  it('should filter completed todos', () => {
    cy.get('.new-todo').type('Task A{enter}');
    cy.get('.new-todo').type('Task B{enter}');
    cy.get('.todo-list li .toggle').first().click();
    cy.contains('Completed').click();
    cy.get('.todo-list li').should('have.class', 'completed');
  });

  it('should clear completed todos', () => {
    cy.get('.new-todo').type('Finish work{enter}');
    cy.get('.todo-list li .toggle').click();
    cy.contains('Clear completed').click();
    cy.get('.todo-list li').should('not.exist');
  });

  it('All filter completed todos', () => {
    cy.get('.new-todo').type('Apple{enter}');
    cy.get('.new-todo').type('Orange{enter}');
    cy.get('.toggle-all').click();
    cy.contains('Completed').click();
    cy.get('.todo-list li').should('have.class', 'completed');
    cy.get('.todo-list li').should('contain', 'Apple');
    cy.get('.todo-list li').should('contain', 'Orange');
  });
});