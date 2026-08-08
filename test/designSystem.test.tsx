import { fireEvent, render } from '@testing-library/react-native';

import { ConnectionBanner } from '@/components/feedback/ConnectionBanner';
import { InlineError } from '@/components/feedback/InlineError';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { Spinner } from '@/components/ui/Spinner';
import { colorSchemePolicy, theme } from '@/design/theme';
import { palette, sizes } from '@/design/tokens';

describe('mobile design system', () => {
  it('uses the approved brand palette with an explicit light-only policy', () => {
    expect(theme.colors.brand).toBe('#7FCC26');
    expect(theme.colors.background).toBe('#E5F3D2');
    expect(theme.colors.accent).toBe('#EAD94C');
    expect(theme.colors.text).toBe('#1F1F1F');
    expect(theme.colors.error).toBe('#D64545');
    expect(theme.colors.pattern).toBe(palette.patternGreen);
    expect(colorSchemePolicy.supported).toEqual(['light']);
  });

  it('hides the optional chess pattern from assistive technology', () => {
    const { getByTestId } = render(
      <Screen background="patterned" testID="example-screen">
        <AppText>Visible content</AppText>
      </Screen>,
    );

    expect(
      getByTestId('example-screen-pattern', {
        includeHiddenElements: true,
      }).props,
    ).toEqual(
      expect.objectContaining({
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no-hide-descendants',
      }),
    );
  });

  it('gives heading text the header role while preserving caller overrides', () => {
    const { getByRole, rerender } = render(
      <AppText variant="title">Learn</AppText>,
    );

    expect(getByRole('header', { name: 'Learn' })).toBeTruthy();

    rerender(
      <AppText accessibilityRole="text" variant="title">
        Learn
      </AppText>,
    );

    expect(getByRole('text', { name: 'Learn' })).toBeTruthy();
  });

  it('supports accessible button press, disabled, and loading states', () => {
    const onPress = jest.fn();
    const { getByRole, rerender } = render(
      <Button onPress={onPress}>Continue</Button>,
    );

    fireEvent.press(getByRole('button', { name: 'Continue' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(sizes.minimumTouchTarget).toBeGreaterThanOrEqual(48);

    rerender(
      <Button disabled onPress={onPress}>
        Continue
      </Button>,
    );
    fireEvent.press(getByRole('button', { name: 'Continue' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );

    rerender(
      <Button loading loadingLabel="Saving" onPress={onPress}>
        Continue
      </Button>,
    );
    expect(
      getByRole('button', { name: 'Saving' }).props.accessibilityState,
    ).toEqual(expect.objectContaining({ busy: true, disabled: true }));
  });

  it('labels loading and announces error and connection feedback', () => {
    const spinner = render(<Spinner label="Loading lessons" />);

    expect(
      spinner.getByRole('progressbar', { name: 'Loading lessons' }),
    ).toBeTruthy();

    const error = render(<InlineError message="Please try again." />);
    expect(error.getByRole('alert')).toBeTruthy();
    expect(error.getByText('Please try again.')).toBeTruthy();

    const connection = render(<ConnectionBanner status="offline" />);
    expect(
      connection.getByText(
        'You are offline. Some features may be unavailable.',
      ),
    ).toBeTruthy();
    expect(connection.getByRole('alert').props.accessibilityLiveRegion).toBe(
      'assertive',
    );
  });
});
