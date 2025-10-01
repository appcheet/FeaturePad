import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface DrawerItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, label, onPress, active }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        active && { backgroundColor: theme.colors.primaryLight },
      ]}
      onPress={onPress}
    >
      <View style={styles.drawerItemContent}>
        <Ionicons
          name={icon}
          size={22}
          color={active ? theme.colors.primary : theme.colors.icon}
        />
        <Text
          style={[
            styles.drawerItemLabel,
            { color: active ? theme.colors.primary : theme.colors.text },
          ]}
        >
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

export const CustomDrawer: React.FC<any> = (props) => {
  const { theme } = useTheme();
  const { navigation, state } = props;
  
  const currentRoute = state?.routes[state.index]?.name;

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout pressed');
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      style={{ backgroundColor: theme.colors.surface }}
    >
      {/* Close Button */}
      <View style={styles.closeContainer}>
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={styles.closeButton}
        >
          <Ionicons name="close-circle" size={28} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
          style={styles.profileImage}
        />
        <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>
          Welcome Back 👋
        </Text>
        <Text style={[styles.userName, { color: theme.colors.text }]}>
          Mahnoor Tanveer
        </Text>
        <View style={styles.emailContainer}>
          <Ionicons name="mail" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
            mahnoor06@gmail.com
          </Text>
        </View>
        <View style={styles.passwordContainer}>
          <Ionicons name="lock-closed" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.password, { color: theme.colors.textSecondary }]}>
            ••••••••
          </Text>
          <TouchableOpacity>
            <Text style={[styles.changePassword, { color: theme.colors.primary }]}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.removeAccount}>
          <Ionicons name="trash-outline" size={16} color={theme.colors.error} />
          <Text style={[styles.removeAccountText, { color: theme.colors.error }]}>
            Remove Account
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <DrawerItem
          icon="home"
          label="Home"
          onPress={() => navigation.navigate('Home')}
          active={currentRoute === 'Home'}
        />
        <DrawerItem
          icon="archive"
          label="Letter Archive"
          onPress={() => navigation.navigate('LetterArchive')}
          active={currentRoute === 'LetterArchive'}
        />
        <DrawerItem
          icon="notifications"
          label="Notifications"
          onPress={() => console.log('Notifications')}
        />
        <DrawerItem
          icon="settings"
          label="Settings"
          onPress={() => console.log('Settings')}
        />
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      {/* Additional Options */}
      <View style={styles.menuSection}>
        <DrawerItem
          icon="create"
          label="Edit Profile"
          onPress={() => console.log('Edit Profile')}
        />
        <DrawerItem
          icon="notifications-outline"
          label="Notification"
          onPress={() => console.log('Notification Settings')}
        />
        <DrawerItem
          icon="help-circle-outline"
          label="Help"
          onPress={() => console.log('Help')}
        />
        <DrawerItem
          icon="mail-outline"
          label="Contact Us"
          onPress={() => console.log('Contact Us')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 0,
  },
  closeContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 4,
  },
  profileSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  password: {
    fontSize: 14,
  },
  changePassword: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  removeAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  removeAccountText: {
    fontSize: 14,
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 16,
    marginHorizontal: 24,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

