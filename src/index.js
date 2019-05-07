import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  SegmentedControlIOS,
  StyleSheet,
  Platform,
} from 'react-native'

export default class Segment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pressedIndex: null,
      selectedIndex: 0,
    }
  }

  render() {
    const selectedIndex = this.props.selectedIndex || this.state.selectedIndex

    if (Platform.OS === 'ios') {
      return (
        <SegmentedControlIOS
          style={styles.container}
          values={this.props.values}
          selectedIndex={this.props.selectedIndex}
          onChange={(event) => {
            if (this.props.onChange) {
              this.props.onChange(event.nativeEvent.selectedSegmentIndex)
            }
          }}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {this.props.values.map((val, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPressIn={() => this.setState({ pressedIndex: index })}
              onPressOut={() => this.setState({ pressedIndex: null })}
              onPress={() => {
                if (index !== selectedIndex) {
                  this.setState({ selectedIndex: index })
                  if (this.props.onChange) {
                    this.props.onChange(index)
                  }
                }
              }}
            >
              <View
                style={[
                  styles.valueContainer,
                  {
                    backgroundColor: index === selectedIndex ?
                      '#0068ff'
                      : index === this.state.pressedIndex ? 'rgba(0,104,255,0.1)' : 'transparent'
                  }
                ]}
              >
                <Text style={[styles.label, { color: index === selectedIndex ? '#fff' : '#0068ff' }]}>{val}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )
    }
  }
}

Segment.propTypes = {
  values: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  enabled: PropTypes.bool,
}

Segment.defaultProps = {
  enabled: true,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  valueContainer: {
    flex: 1,
    height: 27,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
  },
})
