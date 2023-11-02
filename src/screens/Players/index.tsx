import { Container, Form } from "./styles";

import { ButtonIcon } from "@components/Button/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function Players() {
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
     
    </Container>
  )
}