import type { PropsWithChildren } from 'react';
import {
  Image,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import chessPiecePattern from '@/assets/images/chess-piece-pattern.png';
import { theme } from '@/design/theme';
import { sizes, spacing } from '@/design/tokens';

type ScreenBackground = 'plain' | 'soft' | 'patterned';

type ScreenProps = PropsWithChildren<{
  background?: ScreenBackground;
  centered?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}>;

export function Screen({
  background = 'plain',
  centered = false,
  children,
  contentStyle,
  testID = 'screen',
}: ScreenProps) {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        background === 'plain' ? styles.plain : styles.soft,
      ]}
      testID={testID}
    >
      {background === 'patterned' ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={styles.pattern}
          testID={`${testID}-pattern`}
        >
          <Image
            resizeMode="cover"
            source={chessPiecePattern}
            style={styles.patternImage}
          />
        </View>
      ) : null}

      <View
        style={[
          styles.content,
          centered ? styles.centered : undefined,
          contentStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  plain: {
    backgroundColor: theme.colors.backgroundPlain,
  },
  soft: {
    backgroundColor: theme.colors.background,
  },
  pattern: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  patternImage: {
    height: '100%',
    width: '100%',
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: sizes.contentMaxWidth,
    padding: spacing.lg,
    width: '100%',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
