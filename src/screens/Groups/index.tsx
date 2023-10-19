import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { FlatList } from 'react-native';

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
     />
      <GroupCard title="Team 1" />
    </Container>
  );
}

