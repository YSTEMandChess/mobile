import { render, screen } from '@testing-library/react-native';

import { PlaceholderScreen } from '@/components/PlaceholderScreen';

describe('PlaceholderScreen', () => {
  it('renders the requested route title', () => {
    render(<PlaceholderScreen title="Home" />);

    expect(screen.getByRole('header', { name: 'Home' })).toBeOnTheScreen();
  });
});
