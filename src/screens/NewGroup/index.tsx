import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

import { groupCreate } from "@storage/group/groupCreate";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function NewGroup(){
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
     <Header showBackButton />
     <Content>
        <Icon />
        <Highlight 
          title="New Team" 
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />
        <Button
          title="Criar turma"
          style={{ marginTop: 20}}
          onPress={handleNew}
        />
     </Content>
    </Container>
  )
}