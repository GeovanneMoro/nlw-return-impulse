import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { theme } from '../theme';
import { styles } from './styles';

interface ISubmitButtonProps extends TouchableOpacityProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading, ...rest }: ISubmitButtonProps) => {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  );
};
