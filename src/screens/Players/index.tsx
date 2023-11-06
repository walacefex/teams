import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';

import { Button } from '@components/Button';
import { ButtonIcon } from "@components/Button/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playerGetByGroup';
import { AppError } from '@utils/AppError';
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0){
      return Alert.alert('New player', 'Enter the name of the player');
    } 

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playersGetByGroup(group);

    }catch(error) {
      if(error instanceof AppError) {
      Alert.alert('New player', error.message); 
    }else{
      console.log(error);
      Alert.alert('New player', 'Can not add a new player');
    }
  }
}


  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group}
        subtitle=" adicione a galera e separe o times"
      />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}
        ListEmptyComponent={() =>( 
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 }, 
          players.length === 0 && { flex: 1 }
        ]}
      />
      <Button 
        title='Remover turma'
        type='SECONDARY'
      />
    </Container>
  )
}