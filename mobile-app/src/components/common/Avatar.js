import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const Avatar = ({ 
  source, 
  size = 80, 
  name, 
  onPress,
  editable = false,
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const initialsStyle = {
    fontSize: size / 3,
  };

  const renderAvatar = () => {
    if (source) {
      return (
        <Image
          source={typeof source === 'string' ? { uri: source } : source}
          style={[styles.image, avatarStyle]}
        />
      );
    }

    return (
      <View style={[styles.placeholder, avatarStyle]}>
        <Text style={[styles.initials, initialsStyle]}>{getInitials(name)}</Text>
      </View>
    );
  };

  if (onPress || editable) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
        {renderAvatar()}
        {editable && (
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{renderAvatar()}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: colors.gray200,
  },
  placeholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.white,
    fontWeight: typography.weightBold,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
});

export default Avatar;
