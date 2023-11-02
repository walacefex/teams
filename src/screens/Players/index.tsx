import { useState } from 'react';
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { ButtonIcon } from "@components/Button/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState(["Walace"]);
  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title="Nome da turma" 
        subtitle=" adicione a galera e separe o times"
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon icon="house" />
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
      />
    </Container>
  )
}