import React from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from './styles';
import colors from '../../../utils/colors';

export default function CircularProgress({ end, start, now }) {
  const _pad = (num, size) => {
    let string = num + '';
    while (string.length < size) string = '0' + string;
    return string;
  };

  const _getFormattedTime = type => {
    let delta;

    if (type === 'remaining') {
      delta = end - now;
    } else if (type === 'elapsed') {
      delta = now - start;
    }

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = delta % 60;
    return `${_pad(hours, 2)}:${_pad(minutes, 2)}:${_pad(seconds, 2)}`;
  };

  const _getProgress = () => {
    const elapsed_time = now - start;
    return elapsed_time / (end - start);
  };

  const _getRemainingText = fill => {
    const percentage = parseFloat(fill).toFixed(0);

    if (_isComplete(fill)) {
      return 'Completed!';
    }

    return `Remaining (${100 - percentage})%`;
  };

  const _isComplete = fill => {
    const percentage = parseFloat(fill).toFixed(0);
    return percentage > 100;
  };

  return (
    <AnimatedCircularProgress
      style={styles.progressCircle}
      size={300}
      width={23}
      backgroundWidth={10}
      fill={_getProgress() * 100}
      tintColor={colors.light_text2}
      backgroundColor={colors.contrast1}
      rotation={0}
      linecap='round'
      capWidth='5'
    >
      {fill => {
        return (
          <React.Fragment>
            <Text style={styles.progressText1}>{_getRemainingText(fill)}</Text>
            <Text style={styles.progressText2}>
              {_isComplete(fill)
                ? _getFormattedTime('elapsed')
                : _getFormattedTime('remaining')}
            </Text>
            <Text style={styles.progressText3}>
              Elapsed Time ({parseFloat(fill).toFixed(0)}%)
            </Text>
            <Text style={styles.progressText4}>
              {_getFormattedTime('elapsed')}
            </Text>
          </React.Fragment>
        );
      }}
    </AnimatedCircularProgress>
  );
}
