import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ActionGroup,
  Body,
  Button,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  LinkButton,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  SkipLink,
  Stack,
  DataList,
  DataListKey,
  DataListRow,
  DataListValue,
} from '@dsn-starter-kit/components-react';
import {
  logoSlot,
  footerSlot1,
  footerSlot2,
  footerSlot3,
  footerSlot4,
} from './templateSharedContent';

// =============================================================================
// GEDEELDE CONTENT
// =============================================================================

const mainStyle: React.CSSProperties = {
  paddingBlock: 'var(--dsn-space-block-6xl)',
};

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Templates/Form flow/Review page',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

// =============================================================================
// STORIES
// =============================================================================

export const Example: Story = {
  name: 'Review page',
  render: () => (
    <Body>
      <SkipLink href="#main-content" />
      <PageLayout>
        <PageHeader
          logoSlot={logoSlot}
          layout="compact"
          hideMenuButton
          hideSearchButton
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={mainStyle}>
            <Grid>
              <GridItem colSpan={12} colStartLg={3} colEndLg={11}>
                <Stack space="3xl">
                  <Heading level={1}>Titel formulier</Heading>

                  <h2 className="dsn-heading dsn-heading--heading-2">
                    Controleer uw gegevens
                  </h2>

                  <Stack space="5xl">
                    <Stack space="2xl">
                      <Stack space="sm">
                        <h3 className="dsn-heading dsn-heading--heading-3">
                          Titel van stap 1
                        </h3>
                        <Link href="#" iconStart={<Icon name="pencil" />}>
                          Wijzig
                          <span className="dsn-visually-hidden">
                            {' '}
                            Titel van stap 1
                          </span>
                        </Link>
                      </Stack>
                      <DataList>
                        <DataListRow noActions>
                          <DataListKey>Vraag</DataListKey>
                          <DataListValue>
                            Als een banaan een eigen persoonlijkheid zou hebben,
                            welke eigenschappen denk je dat hij dan zou hebben
                            en waarom?
                          </DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Favoriete fruit</DataListKey>
                          <DataListValue>Banaan</DataListValue>
                        </DataListRow>
                      </DataList>
                    </Stack>

                    <Stack space="2xl">
                      <Stack space="sm">
                        <h3 className="dsn-heading dsn-heading--heading-3">
                          Uw gegevens
                        </h3>
                        <Link href="#" iconStart={<Icon name="pencil" />}>
                          Wijzig
                          <span className="dsn-visually-hidden">
                            {' '}
                            Uw gegevens
                          </span>
                        </Link>
                      </Stack>
                      <DataList>
                        <DataListRow noActions>
                          <DataListKey>Voornaam</DataListKey>
                          <DataListValue>Jeroen</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Achternaam</DataListKey>
                          <DataListValue>van Drouwen</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Straat</DataListKey>
                          <DataListValue>Laan der Voorbeelden</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Huisnummer</DataListKey>
                          <DataListValue>9999</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Postcode</DataListKey>
                          <DataListValue>1440 VP</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Woonplaats</DataListKey>
                          <DataListValue>
                            Westerhaar-Vriezenveensewijk
                          </DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Geboortedatum</DataListKey>
                          <DataListValue>9-12-1984</DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>E-mailadres</DataListKey>
                          <DataListValue>
                            jeroenvandrouwen@gmail.com
                          </DataListValue>
                        </DataListRow>
                        <DataListRow noActions>
                          <DataListKey>Telefoonnummer</DataListKey>
                          <DataListValue>06 12 34 56 78</DataListValue>
                        </DataListRow>
                      </DataList>
                    </Stack>
                  </Stack>

                  <ActionGroup
                    direction="vertical"
                    style={{
                      marginBlockStart: 'var(--dsn-space-block-3xl)',
                    }}
                  >
                    <Button variant="strong-positive" type="submit">
                      Versturen
                    </Button>
                    <LinkButton>Opslaan en later verder</LinkButton>
                    <LinkButton>Stoppen met het formulier</LinkButton>
                  </ActionGroup>
                </Stack>
              </GridItem>
            </Grid>
          </main>
        </PageBody>
        <PageFooter
          slot1={footerSlot1}
          slot2={footerSlot2}
          slot3={footerSlot3}
          slot4={footerSlot4}
        />
      </PageLayout>
    </Body>
  ),
};
