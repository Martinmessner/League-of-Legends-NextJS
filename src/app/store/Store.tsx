import { create } from "zustand";

export interface RankInfo {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leaguePoints: number;
  losses: number;
  queueType: string;
  wins: number;
  rank: string;
  tier: string;
  leagueId: string;
}

export interface MatchGameInfo {
  gameCreation: number;
  gameVersion: string;
  gameDuration: number;
  gameEndTimestamp: number;
  participants: Participant[];
  teams: Team[];
}

export interface Team {
  objectives: Objectives;
}

export interface Objectives {
  champion: { kills: number };
  baron: { kills: number };
  dragon: { kills: number };
  tower: { kills: number };
}

export interface Participant {
  puuid: string;
  champLevel: number;
  championName: string;
  summonerName: string;
  participantId: number;
  kills: number;
  assists: number;
  deaths: number;
  totalDamageTaken: number;
  totalDamageDealtToChampions: number;
  totalMinionsKilled: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  [key: string]: any; // Para permitir índices dinámicos (ej. item0, item1, etc.)
}

export interface MatchGroupProps {
  participants: Participant[];
  winGroup: boolean;
  quantityItems: number[];
  expandedParticipants: number[];
  onToggle: (participantId: number) => void;
  totalParticipants: Participant[];
  summonerName: string;
}

export interface ItemPurchased {
  participantId: number;
  itemId: number;
  timestamp: number;
  type: string;
}

export interface SummonerData {
  [x: string]: string | undefined;
  id: string;
  puuid: string;
  profileIconId: string;
  summonerLevel: string;
  gameName: string;
}

export interface RankData {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leagueId: string;
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: string;
  summonerId: string;
  tier: string;
  veteran: boolean;
  wins: number;
}

interface SummonerStore {
  pagination: number;
  quantityItems: number[];
  participantIdsItems: number[];
  currentPage: number;
  summonerName: SummonerData;
  puuidSummonerName: SummonerData;
  historyMatchGames: any[];
  MatchGamesRenderAll: any[];
  valueSummoner: string;
  rankSummonerId: string;
  getUserRankAndLP: Record<string, any>;
  error: string;
  disabled: boolean;
  loading: boolean;
  regionWorld: RegionWorld[];
  selectedRegion: string;
  regionsContinents: RegionsContinents;
  modifyContinentSelected: string;
  TimelineItemId: any[];
  itemsPurchasedFiltered: any[];
  setItemsPurchasedFiltered: (itemsFiltered: any[]) => void;
  setTimelineItemId: (timelineItem: any[]) => void;
  setmodifyContinentSelected: (modifyContinent: string) => void;
  setselectedRegionWorld: (selected: string) => void;
  toggleDisabled: () => void;
  setCurrentPage: (pages: number) => void;
  setHistoryMatchGames: (matches: any[]) => void;
  setMatchGamesRenderAll: (matchesAllGames: any[]) => void;
  setSummonerName: (data: SummonerData) => void;
  setPuuidSummonerName: (data: SummonerData) => void;
  SetvalueSummoner: (value: string) => void;
  SetrankSummonerId: (value: string) => void;
  SetgetUserRankAndLP: (value: Record<string, any>) => void;
  Seterror: (errorMsg: string) => void;
  Setloading: (isLoading: boolean) => void;
}

type RegionWorld = Partial<Record<string, string>>;

type RegionsContinents = Record<string, string>;

const initialSummonerData: SummonerData = {
  puuid: "",
  profileIconId: "",
  summonerLevel: "",
  gameName: "",
  id: "",
};

const useSummonerStore = create<SummonerStore>((set) => ({
  pagination: 4,
  quantityItems: [0, 1, 2, 3, 4, 5, 6],
  participantIdsItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  currentPage: 1,
  summonerName: initialSummonerData,
  puuidSummonerName: initialSummonerData,
  historyMatchGames: [],
  MatchGamesRenderAll: [],
  valueSummoner: "",
  rankSummonerId: "",
  getUserRankAndLP: {},
  error: "",
  disabled: false,
  loading: false,
  regionWorld: [
    { Brasil: "br1" },
    { LAS: "la2" },
    { LAN: "la1" },
    { NorthAmerica: "na1" },
    { Japon: "jp1" },
    { Korea: "kr" },
    { EuropaOeste: "eun1" },
    { EuropaWest: "euw1" },
    { Turkey: "tr1" },
    { Russia: "ru" },
    { Vietnam: "vn2" },
    { Oceania: "oc1" },
    { Philippines: "ph2" },
    { Singapore: "sg2" },
    { Thailand: "th2" },
    { Taiwan: "tw2" },
  ],
  selectedRegion: "",
  regionsContinents: {
    americas: "Brasil, LAS, LAN, NorthAmerica",
    sea: "Oceania, Taiwan, Singapore, Philippines, Thailand",
    europe: "Turkey, Vietnam, Russia, EuropaOeste, EuropaWest",
    asia: "Japon, Korea",
  },
  modifyContinentSelected: "",
  TimelineItemId: [],
  itemsPurchasedFiltered: [],
  setItemsPurchasedFiltered: (itemsFiltered) => {
    set({ itemsPurchasedFiltered: itemsFiltered });
  },
  setTimelineItemId: (timelineItem) => {
    set({ TimelineItemId: timelineItem });
  },
  setmodifyContinentSelected: (modifyContinent) => {
    set({ modifyContinentSelected: modifyContinent });
  },
  setselectedRegionWorld: (selected) => {
    set({ selectedRegion: selected });
  },
  toggleDisabled: () => {
    set((state) => ({ disabled: !state.disabled }));
  },
  setCurrentPage: (pages) => {
    set({ currentPage: pages });
  },
  setHistoryMatchGames: (matches) => {
    set({ historyMatchGames: matches });
  },
  setSummonerName: (data) => {
    set({ summonerName: data });
  },
  setPuuidSummonerName: (data) => {
    set({ puuidSummonerName: data });
  },
  SetvalueSummoner: (value) => {
    set({ valueSummoner: value });
  },
  SetrankSummonerId: (value) => {
    set({ rankSummonerId: value });
  },
  SetgetUserRankAndLP: (value) => {
    set({ getUserRankAndLP: value });
  },
  Seterror: (errorMsg) => {
    set({ error: errorMsg });
  },
  Setloading: (isLoading) => {
    set({ loading: isLoading });
  },
  setMatchGamesRenderAll: (matchesAllGames) => {
    set({ MatchGamesRenderAll: matchesAllGames });
  },
}));

export default useSummonerStore;
