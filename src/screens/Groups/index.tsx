import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { FlatList } from 'react-native';

import { ListEmpty } from '@components/ListEmpty';
import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
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
        />
      )}
      contentContainerStyle={groups.length === 0 && { flex: 1 }}
      ListEmptyComponent={() => <ListEmpty message="No groups found" />}
      showsVerticalScrollIndicator={false}
     />
    </Container>
  );
}

