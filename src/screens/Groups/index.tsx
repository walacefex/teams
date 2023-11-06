import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { ListEmpty } from '@components/ListEmpty';
import { groupsGetAll } from '@storage/group/groupGetAll';
import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try{
      const data = await groupsGetAll();
      setGroups(data); 
    }catch(error){ 
      console.log(error);
     }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
     <Header />
     <Highlight
      title="Teams"
      subtitle='Play with your class'
     />
     <FlatList
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <GroupCard
         title={item}
         onPress={() => handleOpenGroup(item)}
        />
      )}
      contentContainerStyle={groups.length === 0 && { flex: 1 }}
      ListEmptyComponent={() => <ListEmpty message="No groups found" />}
      showsVerticalScrollIndicator={false}
     />
     <Button
      title="Create group"
      onPress={handleNewGroup}
     />
    </Container>
  );
}

