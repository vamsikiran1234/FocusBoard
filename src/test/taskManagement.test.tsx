import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('FocusBoard Full Application End-to-End Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application header and overview stats', async () => {
    render(<App />);

    expect(screen.getByText('Your work, in focus.')).toBeInTheDocument();
    expect(screen.getAllByText('Total tasks').length).toBeGreaterThan(0);
    expect(screen.getAllByText('In progress').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0);
  });

  it('navigates the Focus Notes Carousel', () => {
    render(<App />);

    // Initially slide 1 is visible
    expect(screen.getByText('Make today count.')).toBeInTheDocument();

    // Click Next button
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);

    // Slide 2 title is now visible
    expect(screen.getByText('Small steps, big progress.')).toBeInTheDocument();

    // Click Next button again
    fireEvent.click(nextButton);
    expect(screen.getByText('Celebrate the wins.')).toBeInTheDocument();

    // Click Prev button
    const prevButton = screen.getByLabelText('Previous slide');
    fireEvent.click(prevButton);
    expect(screen.getByText('Small steps, big progress.')).toBeInTheDocument();
  });

  it('validates task title required field when creating task', async () => {
    render(<App />);

    // Click New Task button
    const newButtons = screen.getAllByRole('button', { name: /new task/i });
    fireEvent.click(newButtons[0]);

    // Modal opens
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create new task')).toBeInTheDocument();

    // Attempt to submit empty title
    const submitBtn = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(submitBtn);

    // Validation error shown
    expect(screen.getByText('Task title is required.')).toBeInTheDocument();
  });

  it('successfully creates a new task and updates dashboard counts', async () => {
    render(<App />);

    const newButtons = screen.getAllByRole('button', { name: /new task/i });
    fireEvent.click(newButtons[0]);

    const titleInput = screen.getByPlaceholderText(/e\.g\. update pricing page/i);
    fireEvent.change(titleInput, { target: { value: 'New Test Assessment Task' } });

    const submitBtn = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getAllByText('New Test Assessment Task').length).toBeGreaterThan(0);
    });
  });

  it('filters task list by search query', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/find a task\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'Fix mobile navigation' } });

    expect(screen.getAllByText('Fix mobile navigation').length).toBeGreaterThan(0);
    expect(screen.queryByText('Review onboarding copy')).not.toBeInTheDocument();
  });

  it('opens edit task modal and updates the task title', async () => {
    render(<App />);

    const moreButtons = screen.getAllByLabelText('More task actions');
    fireEvent.click(moreButtons[0]);

    const editButtons = screen.getAllByText('Edit task');
    fireEvent.click(editButtons[0]);

    // Verify Edit Task modal opened
    expect(screen.getByText('Edit task')).toBeInTheDocument();
    expect(screen.getByText('Update your task details and progress.')).toBeInTheDocument();

    const titleInput = screen.getByDisplayValue('Design landing page');
    fireEvent.change(titleInput, { target: { value: 'Design landing page v2' } });

    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getAllByText('Design landing page v2').length).toBeGreaterThan(0);
    });
  });
});
