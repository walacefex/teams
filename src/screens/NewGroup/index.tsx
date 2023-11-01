import { Container, Content, Icon } from "./styles";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function NewGroup(){
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
        />
        <Button title="Criar turma" style={{ marginTop: 20}} />
     </Content>
    </Container>
  )
}