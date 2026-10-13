import React from 'react';
import { classNames } from '@dsn-starter-kit/core';
import './DataList.css';

// =============================================================================
// DataList
// =============================================================================

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Removes the row separator borders
   * @default false
   */
  noBorder?: boolean;

  /**
   * `DataListRow` elements
   */
  children?: React.ReactNode;
}

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ className, noBorder = false, children, ...props }, ref) => {
    const classes = classNames(
      'dsn-data-list',
      noBorder && 'dsn-data-list--no-border',
      className
    );

    return (
      <dl ref={ref} className={classes} {...props}>
        {children}
      </dl>
    );
  }
);

DataList.displayName = 'DataList';

// =============================================================================
// DataListRow
// =============================================================================

export interface DataListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Marks a row without an actions cell; ensures consistent column alignment
   * in mixed lists where some rows have actions and others do not.
   * @default false
   */
  noActions?: boolean;

  /**
   * `DataListKey`, `DataListValue`, and optionally `DataListActions`
   */
  children?: React.ReactNode;
}

export const DataListRow = React.forwardRef<HTMLDivElement, DataListRowProps>(
  ({ className, noActions = false, children, ...props }, ref) => {
    const classes = classNames(
      'dsn-data-list__row',
      noActions && 'dsn-data-list__row--no-actions',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

DataListRow.displayName = 'DataListRow';

// =============================================================================
// DataListKey
// =============================================================================

export interface DataListKeyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text or content
   */
  children?: React.ReactNode;
}

export const DataListKey = React.forwardRef<HTMLElement, DataListKeyProps>(
  ({ className, children, ...props }, ref) => {
    const classes = classNames('dsn-data-list__key', className);

    return (
      <dt ref={ref} className={classes} {...props}>
        {children}
      </dt>
    );
  }
);

DataListKey.displayName = 'DataListKey';

// =============================================================================
// DataListValue
// =============================================================================

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Value content; may contain text, a `Link`, or other inline elements
   */
  children?: React.ReactNode;
}

export const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(
  ({ className, children, ...props }, ref) => {
    const classes = classNames('dsn-data-list__value', className);

    return (
      <dd ref={ref} className={classes} {...props}>
        {children}
      </dd>
    );
  }
);

DataListValue.displayName = 'DataListValue';

// =============================================================================
// DataListActions
// =============================================================================

export interface DataListActionsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * One or more `Link` or `LinkButton` components
   */
  children?: React.ReactNode;
}

export const DataListActions = React.forwardRef<
  HTMLElement,
  DataListActionsProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-data-list__actions', className);

  const isMultiple = React.Children.count(children) > 1;

  return (
    <dd ref={ref} className={classes} {...props}>
      {isMultiple ? (
        <ul className="dsn-data-list__actions-list">
          {React.Children.map(children, (child) => (
            <li className="dsn-data-list__actions-list-item">{child}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </dd>
  );
});

DataListActions.displayName = 'DataListActions';
