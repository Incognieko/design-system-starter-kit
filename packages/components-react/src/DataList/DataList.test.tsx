import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  DataList,
  DataListRow,
  DataListKey,
  DataListValue,
  DataListActions,
} from './DataList';

// =============================================================================
// DataList
// =============================================================================

describe('DataList', () => {
  it('renders as a <dl> element', () => {
    const { container } = render(<DataList />);
    expect(container.firstChild?.nodeName).toBe('DL');
  });

  it('always has base dsn-data-list class', () => {
    const { container } = render(<DataList />);
    expect(container.firstChild).toHaveClass('dsn-data-list');
  });

  it('does not apply --no-border class by default', () => {
    const { container } = render(<DataList />);
    expect(container.firstChild).not.toHaveClass('dsn-data-list--no-border');
  });

  it('applies --no-border class when noBorder is true', () => {
    const { container } = render(<DataList noBorder />);
    expect(container.firstChild).toHaveClass('dsn-data-list--no-border');
  });

  it('applies custom className', () => {
    const { container } = render(<DataList className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-data-list');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders children', () => {
    render(
      <DataList>
        <DataListRow>
          <DataListKey>Naam</DataListKey>
          <DataListValue>Sarah</DataListValue>
        </DataListRow>
      </DataList>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
    expect(screen.getByText('Sarah')).toBeInTheDocument();
  });

  it('forwards ref to the dl element', () => {
    const ref = { current: null as HTMLDListElement | null };
    render(<DataList ref={ref} />);
    expect(ref.current?.tagName).toBe('DL');
  });

  it('spreads additional HTML attributes', () => {
    render(<DataList data-testid="my-list" />);
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
  });
});

// =============================================================================
// DataListRow
// =============================================================================

describe('DataListRow', () => {
  it('renders as a <div> element', () => {
    const { container } = render(
      <dl>
        <DataListRow />
      </dl>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('always has base dsn-data-list__row class', () => {
    const { container } = render(
      <dl>
        <DataListRow />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass('dsn-data-list__row');
  });

  it('does not apply --no-actions class by default', () => {
    const { container } = render(
      <dl>
        <DataListRow />
      </dl>
    );
    expect(container.querySelector('div')).not.toHaveClass(
      'dsn-data-list__row--no-actions'
    );
  });

  it('applies --no-actions class when noActions is true', () => {
    const { container } = render(
      <dl>
        <DataListRow noActions />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass(
      'dsn-data-list__row--no-actions'
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <dl>
        <DataListRow className="custom-row" />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass('custom-row');
  });

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <dl>
        <DataListRow ref={ref} />
      </dl>
    );
    expect(ref.current?.tagName).toBe('DIV');
  });
});

// =============================================================================
// DataListKey
// =============================================================================

describe('DataListKey', () => {
  it('renders as a <dt> element', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListKey>Naam</DataListKey>
        </div>
      </dl>
    );
    expect(container.querySelector('dt')).toBeInTheDocument();
  });

  it('always has base dsn-data-list__key class', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListKey>Naam</DataListKey>
        </div>
      </dl>
    );
    expect(container.querySelector('dt')).toHaveClass('dsn-data-list__key');
  });

  it('renders children', () => {
    render(
      <dl>
        <div>
          <DataListKey>Naam</DataListKey>
        </div>
      </dl>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
  });

  it('forwards ref to the dt element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <DataListKey ref={ref}>Naam</DataListKey>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DT');
  });
});

// =============================================================================
// DataListValue
// =============================================================================

describe('DataListValue', () => {
  it('renders as a <dd> element', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListValue>Sarah</DataListValue>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toBeInTheDocument();
  });

  it('always has base dsn-data-list__value class', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListValue>Sarah</DataListValue>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass('dsn-data-list__value');
  });

  it('renders children', () => {
    render(
      <dl>
        <div>
          <DataListValue>Sarah Hendricks</DataListValue>
        </div>
      </dl>
    );
    expect(screen.getByText('Sarah Hendricks')).toBeInTheDocument();
  });

  it('forwards ref to the dd element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <DataListValue ref={ref}>Sarah</DataListValue>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DD');
  });
});

// =============================================================================
// DataListActions
// =============================================================================

describe('DataListActions', () => {
  it('renders as a <dd> element', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListActions>
            <a href="#">Wijzig</a>
          </DataListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toBeInTheDocument();
  });

  it('always has base dsn-data-list__actions class', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListActions>
            <a href="#">Wijzig</a>
          </DataListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass('dsn-data-list__actions');
  });

  it('renders a single action without a list wrapper', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListActions>
            <a href="#">Wijzig</a>
          </DataListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('ul')).not.toBeInTheDocument();
    expect(screen.getByText('Wijzig')).toBeInTheDocument();
  });

  it('wraps multiple actions in a <ul> with list items', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListActions>
            <a href="#">Wijzig</a>
            <button type="button">Verwijder</button>
          </DataListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('ul')).toHaveClass(
      'dsn-data-list__actions-list'
    );
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(2);
    items.forEach((item) => {
      expect(item).toHaveClass('dsn-data-list__actions-list-item');
    });
  });

  it('forwards ref to the dd element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <DataListActions ref={ref}>
            <a href="#">Wijzig</a>
          </DataListActions>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DD');
  });

  it('applies custom className', () => {
    const { container } = render(
      <dl>
        <div>
          <DataListActions className="custom-actions">
            <a href="#">Wijzig</a>
          </DataListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass('custom-actions');
  });
});

// =============================================================================
// Composition
// =============================================================================

describe('DataList composition', () => {
  it('renders a complete data list with key and value', () => {
    render(
      <DataList>
        <DataListRow>
          <DataListKey>Naam</DataListKey>
          <DataListValue>Sarah Hendricks</DataListValue>
        </DataListRow>
      </DataList>
    );
    expect(screen.getByText('Naam').tagName).toBe('DT');
    expect(screen.getByText('Sarah Hendricks').tagName).toBe('DD');
  });

  it('renders a complete data list with actions', () => {
    render(
      <DataList>
        <DataListRow>
          <DataListKey>Naam</DataListKey>
          <DataListValue>Sarah Hendricks</DataListValue>
          <DataListActions>
            <a href="#">Wijzig</a>
          </DataListActions>
        </DataListRow>
      </DataList>
    );
    expect(screen.getByText('Wijzig')).toBeInTheDocument();
  });

  it('renders multiple rows', () => {
    render(
      <DataList>
        <DataListRow>
          <DataListKey>Naam</DataListKey>
          <DataListValue>Sarah</DataListValue>
        </DataListRow>
        <DataListRow>
          <DataListKey>Leeftijd</DataListKey>
          <DataListValue>34</DataListValue>
        </DataListRow>
      </DataList>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
    expect(screen.getByText('Leeftijd')).toBeInTheDocument();
  });
});
