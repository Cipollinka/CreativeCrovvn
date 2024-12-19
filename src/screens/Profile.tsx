import React, {useLayoutEffect} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import ActionText from '@/components/ActionText';
import BottomNavigation from '@/components/BottomNavigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';
import ProfileIcon from '@/assets/icons/profile.svg';

export default function Profile() {
  const nav = useNavigation<UseNavigationProp>();

  const user = useUserStore(store => store.user);
  const tracks = useUserStore(store => store.tracks);
  const books = useUserStore(store => store.books);

  const isEmpty = !tracks.length && !books.length;

  useLayoutEffect(() => {
    if (!user.name) {
      nav.navigate(Screens.PROFILE_EDIT);
    }
  }, [user, nav]);

  return (
    <BackgroundWrapper>
      <Row
        style={{
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
          padding: 16,
        }}>
        <CustomText>Profile</CustomText>

        <View style={{position: 'absolute', right: 16, top: 20}}>
          <ActionText
            title="Settings"
            onPress={() => nav.navigate(Screens.SETTINGS)}
          />
        </View>
      </Row>

      <ScrollView
        scrollEnabled={!isEmpty}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 'auto'}}>
        <View
          style={{
            marginTop: isEmpty ? '40%' : '20%',
            backgroundColor: '#2F2F31',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 20,
            width: '100%',
            paddingBottom: isEmpty ? '50%' : '10%',
          }}>
          <View
            style={{width: '100%', alignItems: 'center', marginTop: '-18%'}}>
            {user.avatar && (
              <Image
                source={{uri: user.avatar}}
                style={{width: 120, height: 120, borderRadius: 9999}}
              />
            )}
            {!user.avatar && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 120,
                  backgroundColor: '#2F2F31',
                  borderRadius: 9999,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <ProfileIcon width={61} height={61} />
              </View>
            )}
          </View>
          <View style={{width: '100%', marginTop: 20, alignItems: 'center'}}>
            <CustomText fs={22}>
              {user.name} {user.surname}
            </CustomText>
            <CustomText fs={13} mt={10} color="#ABABAB">
              {user.description}
            </CustomText>

            <CustomText mt={10} fs={15} color="#ABABAB">
              Number of completed projects:{' '}
              <CustomText fw="bold" fs={15} style={{fontWeight: 700}}>
                {tracks.length + books.length}
              </CustomText>
            </CustomText>

            <CustomText mt={10} fs={15} color="#ABABAB">
              Total files created:{' '}
              <CustomText fw="bold" fs={15} style={{fontWeight: 700}}>
                {tracks.length + books.length}
              </CustomText>
            </CustomText>
          </View>

          {isEmpty && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText fs={22} mt={50} style={{fontWeight: 600}}>
                There's nothing here yet
              </CustomText>
            </View>
          )}

          {books.length > 0 && (
            <View style={{width: '100%', marginTop: 20, gap: 20}}>
              <CustomText>My books</CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 0}}>
                {books.map((book, index) => (
                  <TouchableOpacity
                    key={book.id}
                    onPress={() => nav.navigate(Screens.BOOK_DETAILS, {book})}>
                    <View
                      style={{
                        width: 166,
                        height: 215,
                        borderRadius: 10,
                        backgroundColor: '#212121',
                        marginLeft: index === 0 ? 0 : 10,
                      }}>
                      {book.cover && (
                        <Image
                          source={{uri: book.cover}}
                          style={{
                            width: 166,
                            height: 215,
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </View>
                    <CustomText mt={5}>{book.title}</CustomText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {!isEmpty && (
            <View style={{width: '100%', marginTop: 20, gap: 20}}>
              {tracks.length > 0 && (
                <View>
                  <CustomText>My tracks</CustomText>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10}}>
                    {tracks.map((track, index) => (
                      <TouchableOpacity
                        key={track.id}
                        onPress={() =>
                          nav.navigate(Screens.TRACK_DETAILS, {track})
                        }>
                        <View
                          style={{
                            width: 166,
                            height: 215,
                            borderRadius: 10,
                            backgroundColor: '#212121',
                            marginLeft: index === 0 ? 0 : 10,
                          }}>
                          {track.cover && (
                            <Image
                              source={{uri: track.cover}}
                              style={{
                                width: 166,
                                height: 215,
                                borderRadius: 10,
                              }}
                            />
                          )}
                        </View>
                        <CustomText mt={5}>{track.title}</CustomText>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
