import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DataList,
  DataListRow,
  DataListKey,
  DataListValue,
  DataListActions,
  Link,
  LinkButton,
  Icon,
} from '@dsn-starter-kit/components-react';
import DocsPage from './DataList.docs.mdx';
import { VEEL_TEKST } from './story-helpers';

const meta: Meta<typeof DataList> = {
  title: 'Components/DataList',
  component: DataList,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const cls = [
          'dsn-data-list',
          args.noBorder && 'dsn-data-list--no-border',
        ]
          .filter(Boolean)
          .join(' ');
        const row = (
          key: string,
          value: string
        ) => `  <div class="dsn-data-list__row">
    <dt class="dsn-data-list__key">${key}</dt>
    <dd class="dsn-data-list__value">${value}</dd>
  </div>`;
        return `<dl class="${cls}">
${[
  row('Naam', 'Jeroen van Drouwen'),
  row('Geboortedatum', '9 december 1984'),
  row('Adres', 'Laan der Voorbeelden, 1440 VP, Westerhaar-Vriezenveensewijk'),
].join('\n')}
</dl>`;
      },
    },
  },
  argTypes: {
    noBorder: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    noBorder: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataList>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <DataList {...args}>
      <DataListRow>
        <DataListKey>Naam</DataListKey>
        <DataListValue>Jeroen van Drouwen</DataListValue>
      </DataListRow>
      <DataListRow>
        <DataListKey>Geboortedatum</DataListKey>
        <DataListValue>9 december 1984</DataListValue>
      </DataListRow>
      <DataListRow>
        <DataListKey>Adres</DataListKey>
        <DataListValue>
          Laan der Voorbeelden, 1440 VP, Westerhaar-Vriezenveensewijk
        </DataListValue>
      </DataListRow>
    </DataList>
  ),
};

// =============================================================================
// VARIANTEN
// =============================================================================

export const WithActions: Story = {
  render: () => (
    <DataList>
      <DataListRow>
        <DataListKey>Naam</DataListKey>
        <DataListValue>Jeroen van Drouwen</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>Geboortedatum</DataListKey>
        <DataListValue>9 december 1984</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>Adres</DataListKey>
        <DataListValue>
          Laan der Voorbeelden, 1440 VP, Westerhaar-Vriezenveensewijk
        </DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> adres</span>
          </Link>
        </DataListActions>
      </DataListRow>
    </DataList>
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <DataList>
      <DataListRow>
        <DataListKey>Naam</DataListKey>
        <DataListValue>Jeroen van Drouwen</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
          <LinkButton onClick={() => {}} iconStart={<Icon name="trash" />}>
            Verwijder<span className="dsn-visually-hidden"> naam</span>
          </LinkButton>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>Geboortedatum</DataListKey>
        <DataListValue>9 december 1984</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
          <LinkButton onClick={() => {}} iconStart={<Icon name="trash" />}>
            Verwijder<span className="dsn-visually-hidden"> geboortedatum</span>
          </LinkButton>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>Adres</DataListKey>
        <DataListValue>
          Laan der Voorbeelden, 1440 VP, Westerhaar-Vriezenveensewijk
        </DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> adres</span>
          </Link>
          <LinkButton onClick={() => {}} iconStart={<Icon name="trash" />}>
            Verwijder<span className="dsn-visually-hidden"> adres</span>
          </LinkButton>
        </DataListActions>
      </DataListRow>
    </DataList>
  ),
};

export const MixedRows: Story = {
  render: () => (
    <DataList>
      <DataListRow>
        <DataListKey>Naam</DataListKey>
        <DataListValue>Jeroen van Drouwen</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>Geboortedatum</DataListKey>
        <DataListValue>9 december 1984</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
        </DataListActions>
      </DataListRow>
      <DataListRow noActions>
        <DataListKey>Referentienummer</DataListKey>
        <DataListValue>ABC-123-XYZ</DataListValue>
      </DataListRow>
      <DataListRow noActions>
        <DataListKey>Aanvraagdatum</DataListKey>
        <DataListValue>6 mei 2026</DataListValue>
      </DataListRow>
    </DataList>
  ),
};

export const NoBorder: Story = {
  render: () => (
    <DataList noBorder>
      <DataListRow>
        <DataListKey>Status</DataListKey>
        <DataListValue>Actief</DataListValue>
      </DataListRow>
      <DataListRow>
        <DataListKey>Type</DataListKey>
        <DataListValue>Particulier</DataListValue>
      </DataListRow>
      <DataListRow>
        <DataListKey>Regio</DataListKey>
        <DataListValue>Noord-Holland</DataListValue>
      </DataListRow>
    </DataList>
  ),
};

// =============================================================================
// OVERZICHTSSTORIES
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Basic</p>
        <DataList>
          <DataListRow>
            <DataListKey>Naam</DataListKey>
            <DataListValue>Jeroen van Drouwen</DataListValue>
          </DataListRow>
          <DataListRow>
            <DataListKey>Geboortedatum</DataListKey>
            <DataListValue>9 december 1984</DataListValue>
          </DataListRow>
        </DataList>
      </div>

      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>With Actions</p>
        <DataList>
          <DataListRow>
            <DataListKey>Naam</DataListKey>
            <DataListValue>Jeroen van Drouwen</DataListValue>
            <DataListActions>
              <Link href="#" iconStart={<Icon name="pencil" />}>
                Wijzig<span className="dsn-visually-hidden"> naam</span>
              </Link>
            </DataListActions>
          </DataListRow>
          <DataListRow>
            <DataListKey>Geboortedatum</DataListKey>
            <DataListValue>9 december 1984</DataListValue>
            <DataListActions>
              <Link href="#" iconStart={<Icon name="pencil" />}>
                Wijzig
                <span className="dsn-visually-hidden"> geboortedatum</span>
              </Link>
            </DataListActions>
          </DataListRow>
        </DataList>
      </div>

      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>No Border</p>
        <DataList noBorder>
          <DataListRow>
            <DataListKey>Status</DataListKey>
            <DataListValue>Actief</DataListValue>
          </DataListRow>
          <DataListRow>
            <DataListKey>Type</DataListKey>
            <DataListValue>Particulier</DataListValue>
          </DataListRow>
        </DataList>
      </div>
    </div>
  ),
};

// =============================================================================
// TEKST VARIANTEN
// =============================================================================

export const ShortText: Story = {
  render: () => (
    <DataList>
      <DataListRow>
        <DataListKey>A</DataListKey>
        <DataListValue>B</DataListValue>
      </DataListRow>
      <DataListRow>
        <DataListKey>C</DataListKey>
        <DataListValue>D</DataListValue>
      </DataListRow>
    </DataList>
  ),
};

export const LongText: Story = {
  render: () => (
    <DataList>
      <DataListRow>
        <DataListKey>{VEEL_TEKST}</DataListKey>
        <DataListValue>{VEEL_TEKST}</DataListValue>
        <DataListActions>
          <Link href="#" iconStart={<Icon name="pencil" />}>
            Wijzig<span className="dsn-visually-hidden"> {VEEL_TEKST}</span>
          </Link>
        </DataListActions>
      </DataListRow>
      <DataListRow>
        <DataListKey>{VEEL_TEKST}</DataListKey>
        <DataListValue>{VEEL_TEKST}</DataListValue>
      </DataListRow>
    </DataList>
  ),
};
