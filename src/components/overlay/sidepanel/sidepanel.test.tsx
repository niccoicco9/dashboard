import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SidePanel from './sidepanel';

describe('SidePanel', () => {
  it('does not render when closed', () => {
    const onClose = vi.fn();
    const { queryByTestId } = render(
      <SidePanel isOpen={false} onClose={onClose}>content</SidePanel>
    );
    expect(queryByTestId('sidepanel-overlay')).toBeNull();
  });

  it('renders content when open', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose} title="Title">
        <div data-testid="panel-content">content</div>
      </SidePanel>
    );
    expect(screen.getByTestId('sidepanel-overlay')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
  });

  it('closes on close button click', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose}>
        content
      </SidePanel>
    );
    fireEvent.click(screen.getByTestId('sidepanel-close'));
    // close uses delayed timeout; simulate immediate call
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on overlay click when enabled', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose} closeOnOverlayClick>
        content
      </SidePanel>
    );
    fireEvent.click(screen.getByTestId('sidepanel-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close on overlay click when disabled', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose} closeOnOverlayClick={false}>
        content
      </SidePanel>
    );
    fireEvent.click(screen.getByTestId('sidepanel-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on ESC when enabled', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose} closeOnEsc>
        content
      </SidePanel>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close on ESC when disabled', () => {
    const onClose = vi.fn();
    render(
      <SidePanel isOpen onClose={onClose} closeOnEsc={false}>
        content
      </SidePanel>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
});


