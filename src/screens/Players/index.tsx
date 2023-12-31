import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

import { AppError } from '@utils/AppError';

import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupandTeam';

import { Button } from '@components/Button';
import { ButtonIcon } from "@components/Button/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

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

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch(error) {
      if(error instanceof AppError) {
      Alert.alert('New player', error.message); 
    }else{
      console.log(error);
      Alert.alert('New player', 'Can not add a new player');
    }
  }
}

async function fetchPlayersByTeam() {
  try{
    setIsLoading(true);
    const playersByTeam = await playersGetByGroupAndTeam(group, team);
    setPlayers(playersByTeam);  
  } catch(error) {
    console.log(error);
    Alert.alert('Players', 'Can not load players');
  } finally {
    setIsLoading(false);
  }
}

async function handleRemovePlayer(playerName: string) {
  try{
    await playersRemoveByGroup(playerName, group);
    fetchPlayersByTeam();
  } catch(error) {
    console.log(error);
    Alert.alert('Players', 'Can not remove player');
  }
}

async function groupRemove(){
  try{
    await groupRemoveByName(group);
   navigation.navigate('groups');
  } catch(error) {
    console.log(error);
    Alert.alert('Group', 'Can not remove group');
  }
}

async function handleGroupRemove() {
  Alert.alert(
    'Remove Team',
    'Are you sure you want to remove this team?',
    [
      {text: 'No', style: 'cancel'},
      {text: 'Yes', onPress: () => groupRemove() },
    ]
  )
}

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group}
        subtitle=" adicione a galera e separe o times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyLabel="done"
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
      {isLoading ? <Loading /> : 
      
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
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
      }
      <Button 
        title='Remover turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Container>
  )
}