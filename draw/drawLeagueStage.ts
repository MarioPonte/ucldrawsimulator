type Team = {
    id: number;
    name: string;
    country: string;
};

type teamMatches = {
    team: string;
    home: string[];
    away: string[];
    selectedCountries: { [country: string]: number };
};

// Função para sortear os jogos de todas as equipas da competição
export function drawLeagueStage(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] | null = null;

    while (!drawData) drawData = attemptDraw(pots);
    console.log(`Sorteio concluído com sucesso`);
    return drawData;
}

function attemptDraw(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] = [];

    // Inicializamos o array com as equipas e confrontos vazios
    pots.forEach((pot: any) => {
        pot.forEach((team: any) => drawData.push({ team: team.name, home: [], away: [], selectedCountries: {} }));
    });

    let pot1TeamsAvailable = [...pots[0]];
    let pot1TeamsAvailable2 = [...pots[0]];
    let pot1TeamsAvailable3 = [...pots[0]];
    let pot1TeamsAvailable4 = [...pots[0]];
    let pot2TeamsAvailable = [...pots[1]];
    let pot2TeamsAvailable2 = [...pots[1]];
    let pot2TeamsAvailable3 = [...pots[1]];
    let pot2TeamsAvailable4 = [...pots[1]];
    let pot3TeamsAvailable = [...pots[2]];
    let pot3TeamsAvailable2 = [...pots[2]];
    let pot3TeamsAvailable3 = [...pots[2]];
    let pot3TeamsAvailable4 = [...pots[2]];
    let pot4TeamsAvailable = [...pots[3]];
    let pot4TeamsAvailable2 = [...pots[3]];
    let pot4TeamsAvailable3 = [...pots[3]];
    let pot4TeamsAvailable4 = [...pots[3]];

    // Função de backtracking
    const backtrack = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[0].length) return true;

        const potTeam = pots[0][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot1TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot1TeamsAvailable.indexOf(opponent);
            if (index > -1) pot1TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot1TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const backtrack2 = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[1].length) return true;

        const potTeam = pots[0][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot2TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot2TeamsAvailable.indexOf(opponent);
            if (index > -1) pot2TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack2(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot2TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const backtrack3 = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[2].length) return true;

        const potTeam = pots[0][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot3TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot3TeamsAvailable.indexOf(opponent);
            if (index > -1) pot3TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack3(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot3TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const backtrack4 = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[3].length) return true;

        const potTeam = pots[0][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot4TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot4TeamsAvailable.indexOf(opponent);
            if (index > -1) pot4TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack4(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot4TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot2Backtrack1 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[0].length) return true;

        const potTeam = pots[1][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot1TeamsAvailable2.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot1TeamsAvailable2.indexOf(opponent);
            if (index > -1) pot1TeamsAvailable2.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot2Backtrack1(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot1TeamsAvailable2.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot2Backtrack2 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[1].length) return true;

        const potTeam = pots[1][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot2TeamsAvailable2.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot2TeamsAvailable2.indexOf(opponent);
            if (index > -1) pot2TeamsAvailable2.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot2Backtrack2(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot2TeamsAvailable2.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot2Backtrack3 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[2].length) return true;

        const potTeam = pots[1][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot3TeamsAvailable2.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot3TeamsAvailable2.indexOf(opponent);
            if (index > -1) pot3TeamsAvailable2.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot2Backtrack3(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot3TeamsAvailable2.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot2Backtrack4 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[3].length) return true;

        const potTeam = pots[1][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot4TeamsAvailable2.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot4TeamsAvailable2.indexOf(opponent);
            if (index > -1) pot4TeamsAvailable2.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot2Backtrack4(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot4TeamsAvailable2.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot3Backtrack1 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[0].length) return true;

        const potTeam = pots[2][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot1TeamsAvailable3.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot1TeamsAvailable3.indexOf(opponent);
            if (index > -1) pot1TeamsAvailable3.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot3Backtrack1(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot1TeamsAvailable3.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot3Backtrack2 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[1].length) return true;

        const potTeam = pots[2][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot2TeamsAvailable3.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot2TeamsAvailable3.indexOf(opponent);
            if (index > -1) pot2TeamsAvailable3.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot3Backtrack2(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot2TeamsAvailable3.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot3Backtrack3 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[2].length) return true;

        const potTeam = pots[2][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot3TeamsAvailable3.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot3TeamsAvailable3.indexOf(opponent);
            if (index > -1) pot3TeamsAvailable3.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot3Backtrack3(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot3TeamsAvailable3.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot3Backtrack4 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[3].length) return true;

        const potTeam = pots[2][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot4TeamsAvailable3.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot4TeamsAvailable3.indexOf(opponent);
            if (index > -1) pot4TeamsAvailable3.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot3Backtrack4(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot4TeamsAvailable3.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot4Backtrack1 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[0].length) return true;

        const potTeam = pots[3][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot1TeamsAvailable4.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot1TeamsAvailable4.indexOf(opponent);
            if (index > -1) pot1TeamsAvailable4.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot4Backtrack1(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot1TeamsAvailable4.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot4Backtrack2 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[1].length) return true;

        const potTeam = pots[3][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot2TeamsAvailable4.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot2TeamsAvailable4.indexOf(opponent);
            if (index > -1) pot2TeamsAvailable4.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot4Backtrack2(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot2TeamsAvailable4.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot4Backtrack3 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[2].length) return true;

        const potTeam = pots[3][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot3TeamsAvailable4.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot3TeamsAvailable4.indexOf(opponent);
            if (index > -1) pot3TeamsAvailable4.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot4Backtrack3(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot3TeamsAvailable4.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    const pot4Backtrack4 = (teamIndex: number): boolean => {

        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[3].length) return true;

        const potTeam = pots[3][teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id - 1].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot4TeamsAvailable4.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id - 1]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id - 1].selectedCountries[opponent.country] = (drawData[potTeam.id - 1].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot4TeamsAvailable4.indexOf(opponent);
            if (index > -1) pot4TeamsAvailable4.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (pot4Backtrack4(teamIndex + 1)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot4TeamsAvailable4.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    if (!backtrack(0) || !backtrack2(0) || !backtrack3(0) || !backtrack4(0) || 
    !pot2Backtrack1(0) || !pot2Backtrack2(0) || !pot2Backtrack3(0) || !pot2Backtrack4(0) || 
    !pot3Backtrack1(0) || !pot3Backtrack2(0) || !pot3Backtrack3(0) || !pot3Backtrack4(0) ||
    !pot4Backtrack1(0) || !pot4Backtrack2(0) || !pot4Backtrack3(0) || !pot4Backtrack4(0)){
        console.log("Não foi possível encontrar um sorteio válido.");
        return null;
    }

    console.log(drawData);
    return drawData;
}