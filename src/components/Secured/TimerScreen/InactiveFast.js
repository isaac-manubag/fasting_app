import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView, withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import FastCards from '../FastCards'
import styles, {sliderWidth, itemWidth} from './styles';
import Colors from '../../../utils/colors';
import fastItems from '../../../utils/fasts';

class InactiveFast extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  _renderItem({ item }) {
    return (
      <FastCards.Container key={item.id}>
        <FastCards.Title text={item.title} />
        <FastCards.Description text={item.time_to_fast}/>
      </FastCards.Container>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text style={styles.header}>You are not fasting</Text>
        <Icon
          iconStyle={styles.warnIcon}
          name='exclamation-triangle'
          type='font-awesome'
          color={Colors.light_text2}
        />
        <Text style={styles.paragraph}>
          Choose a fast from the Quick picker below or tap the button to read
          abouth our fasts
        </Text>
        <Button
          title='See all fasts'
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={() => this.props.navigation.navigate('Fasts')}
        />
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={fastItems}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(InactiveFast));
