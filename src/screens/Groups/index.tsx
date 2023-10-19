import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

export function Groups() {
  return (
    <Container>
     <Header />
     <Highlight
      title="Teams"
      subtitle='Play with your class'
     />
      <GroupCard title="Team 1" />
    </Container>
  );
}

