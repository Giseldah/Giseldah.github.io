// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
var DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	var SN = SName.trim().toUpperCase();
	var L = SLvl;
	var Lm = L-DblCalcDev;
	var Lp = L+DblCalcDev;
	var N = 1;
	var C = "";
	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number")
			N = SParam;
		else if (typeof SParam === "string")
			C = SParam;
	}

	if (SN < "PARRYPBONUS") {
		if (SN < "DEVHITPRATPC") {
			if (SN < "BURGLARCDCALCTYPETACMIT") {
				if (SN < "BPEPRATPA") {
					if (SN < "BLACKARROWCDCALCTYPETACMIT") {
						if (SN < "BEORNINGCDCALCTYPECOMPHYMIT") {
							if (SN < "ADJUMBARTRAITMIT") {
								if (SN > "-VERSION") {
									if (SN == "ADJUMBARTRAIT") {
										if (Lm <= 140) {
											return 1;
										} else if (Lm <= 150) {
											return 0.9;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else if (SN == "-VERSION") {
									return "2.3p";
								} else {
									return 0;
								}
							} else if (SN > "ADJUMBARTRAITMIT") {
								if (SN > "ARMOURPENT") {
									if (SN == "BEORNINGCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "ARMOURPENT") {
									return StatLinInter("PntMPArmourPenT","TraitProg","ProgBArmour","",L,N,0);
								} else {
									return 0;
								}
							} else {
								if (Lm <= 140) {
									return 1;
								} else if (Lm <= 141) {
									return 0.78;
								} else {
									return 0.7;
								}
							}
						} else if (SN > "BEORNINGCDCALCTYPECOMPHYMIT") {
							if (SN < "BEORNINGCDCANBLOCK") {
								if (SN > "BEORNINGCDCALCTYPENONPHYMIT") {
									if (SN == "BEORNINGCDCALCTYPETACMIT") {
										return 27;
									} else {
										return 0;
									}
								} else if (SN == "BEORNINGCDCALCTYPENONPHYMIT") {
									return 14;
								} else {
									return 0;
								}
							} else if (SN > "BEORNINGCDCANBLOCK") {
								if (SN < "BLACKARROWCDCALCTYPECOMPHYMIT") {
									if (SN == "BLACKARROWCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN > "BLACKARROWCDCALCTYPECOMPHYMIT") {
									if (SN == "BLACKARROWCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else {
									return 13;
								}
							} else {
								if (Lm <= 5) {
									return 0;
								} else {
									return 1;
								}
							}
						} else {
							return 14;
						}
					} else if (SN > "BLACKARROWCDCALCTYPETACMIT") {
						if (SN < "BLOCKPRATPB") {
							if (SN < "BLOCKPPRAT") {
								if (SN > "BLACKARROWCDHASPOWER") {
									if (SN == "BLOCKPBONUS") {
										return CalcStat("BPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "BLACKARROWCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPPRAT") {
								if (SN > "BLOCKPRATP") {
									if (SN == "BLOCKPRATPA") {
										return CalcStat("BPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPPRat",L,N);
							}
						} else if (SN > "BLOCKPRATPB") {
							if (SN < "BLOCKPRATPCAPR") {
								if (SN > "BLOCKPRATPC") {
									if (SN == "BLOCKPRATPCAP") {
										return CalcStat("BPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPRATPCAPR") {
								if (SN < "BPEPPRAT") {
									if (SN == "BPEPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN > "BPEPPRAT") {
									if (SN == "BPEPRATP") {
										return CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
									} else {
										return 0;
									}
								} else {
									return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
								}
							} else {
								return CalcStat("BPEPRatPCapR",L);
							}
						} else {
							return CalcStat("BPEPRatPB",L);
						}
					} else {
						return 27;
					}
				} else if (SN > "BPEPRATPA") {
					if (SN < "BRATOUTHEAL") {
						if (SN < "BRATCRITMAGN") {
							if (SN < "BPEPRATPCAP") {
								if (SN > "BPEPRATPB") {
									if (SN == "BPEPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPB") {
									return CalcStat("BRatRounded",L,"BRatStandard");
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATPCAP") {
								if (SN > "BPEPRATPCAPR") {
									if (SN == "BPET") {
										return StatLinInter("PntMPBPE","TraitProg","ProgBBPE","AdjUmbarTrait",L,N,0);
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPCAPR") {
									return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 13;
							}
						} else if (SN > "BRATCRITMAGN") {
							if (SN < "BRATMITHEAVY") {
								if (SN > "BRATDEVHIT") {
									if (SN == "BRATEXTRA") {
										return CalcStat("StdProg",L,300);
									} else {
										return 0;
									}
								} else if (SN == "BRATDEVHIT") {
									return CalcStat("StdProg",L,400);
								} else {
									return 0;
								}
							} else if (SN > "BRATMITHEAVY") {
								if (SN < "BRATMITLIGHT") {
									if (SN == "BRATMITIGATIONS") {
										if (Lm <= 50) {
											return LinFmod(1,(N*CalcStat("BRatStandard",1))*7/6-50.4,N*CalcStat("BRatStandard",50),1,50,L,"P");
										} else if (Lm <= 60) {
											return LinFmod(N,CalcStat("BRatStandard",50),CalcStat("BRatStandard",60),50,60,L,"P");
										} else if (Lm <= 65) {
											return LinFmod(N,CalcStat("BRatStandard",60),CalcStat("BRatStandard",65),60,65,L,"P");
										} else if (Lm <= 75) {
											return LinFmod(N,CalcStat("BRatStandard",65),CalcStat("BRatStandard",75),65,75,L,"P");
										} else if (Lm <= 85) {
											return LinFmod(N,CalcStat("BRatStandard",75),CalcStat("BRatStandard",85),75,85,L,"P");
										} else if (Lm <= 95) {
											return LinFmod(N,CalcStat("BRatStandard",85),CalcStat("BRatStandard",95),85,95,L,"P");
										} else if (Lm <= 100) {
											return LinFmod(N,CalcStat("BRatStandard",95),CalcStat("BRatStandard",100),95,100,L,"P");
										} else if (Lm <= 105) {
											return LinFmod(N,CalcStat("BRatStandard",100),CalcStat("BRatStandard",105),100,105,L,"P");
										} else if (Lm <= 115) {
											return LinFmod(N,CalcStat("BRatStandard",106),CalcStat("BRatStandard",115),106,115,L,"P");
										} else if (Lm <= 120) {
											return LinFmod(N,CalcStat("BRatStandard",116),CalcStat("BRatStandard",120),116,120,L,"P");
										} else if (Lm <= 130) {
											return LinFmod(N,CalcStat("BRatStandard",121),CalcStat("BRatStandard",130),121,130,L,"P");
										} else if (Lm <= 140) {
											return LinFmod(N,CalcStat("BRatStandard",131),CalcStat("BRatStandard",140),131,140,L,"P");
										} else if (Lm <= 150) {
											return LinFmod(N,CalcStat("BRatStandard",141),CalcStat("BRatStandard",150),141,150,L,"P");
										} else {
											return LinFmod(N,CalcStat("BRatStandard",151),CalcStat("BRatStandard",160),151,160,L,"P");
										}
									} else {
										return 0;
									}
								} else if (SN > "BRATMITLIGHT") {
									if (SN == "BRATMITMEDIUM") {
										return CalcStat("BRatMitigations",L,0.833);
									} else {
										return 0;
									}
								} else {
									return CalcStat("BRatMitigations",L,0.666);
								}
							} else {
								return CalcStat("BRatStandard",L);
							}
						} else {
							return CalcStat("StdProg",L,600);
						}
					} else if (SN > "BRATOUTHEAL") {
						if (SN < "BRAWLERCDCALCTYPECOMPHYMIT") {
							if (SN < "BRATROUNDED") {
								if (SN > "BRATPARTBPE") {
									if (SN == "BRATPROGB") {
										if (Lm <= 50) {
											return RoundDbl(CalcStat(C,L));
										} else {
											return CalcStat(C,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRATPARTBPE") {
									return CalcStat("StdProg",L,350);
								} else {
									return 0;
								}
							} else if (SN > "BRATROUNDED") {
								if (SN > "BRATSTANDARD") {
									if (SN == "BRAWLERCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "BRATSTANDARD") {
									return CalcStat("StdProg",L,200);
								} else {
									return 0;
								}
							} else {
								if (Lm <= 50) {
									return RoundDbl(CalcStat(C,L));
								} else if (Lm <= 105) {
									return RoundDbl(CalcStat(C,L),-1);
								} else if (Lm <= 115) {
									return RoundDbl(CalcStat(C,L),-2);
								} else if (Lm <= 130) {
									return RoundDbl(CalcStat(C,L),-1);
								} else if (Lm <= 150) {
									return RoundDbl(CalcStat(C,L),-2);
								} else {
									return RoundDbl(CalcStat(C,L));
								}
							}
						} else if (SN > "BRAWLERCDCALCTYPECOMPHYMIT") {
							if (SN < "BRAWLERCDHASPOWER") {
								if (SN > "BRAWLERCDCALCTYPENONPHYMIT") {
									if (SN == "BRAWLERCDCALCTYPETACMIT") {
										return 27;
									} else {
										return 0;
									}
								} else if (SN == "BRAWLERCDCALCTYPENONPHYMIT") {
									return 14;
								} else {
									return 0;
								}
							} else if (SN > "BRAWLERCDHASPOWER") {
								if (SN < "BURGLARCDCALCTYPECOMPHYMIT") {
									if (SN == "BURGLARCDARMOURTYPE") {
										return 2;
									} else {
										return 0;
									}
								} else if (SN > "BURGLARCDCALCTYPECOMPHYMIT") {
									if (SN == "BURGLARCDCALCTYPENONPHYMIT") {
										return 13;
									} else {
										return 0;
									}
								} else {
									return 13;
								}
							} else {
								return 1;
							}
						} else {
							return 14;
						}
					} else {
						return CalcStat("StdProg",L,450);
					}
				} else {
					return 39;
				}
			} else if (SN > "BURGLARCDCALCTYPETACMIT") {
				if (SN < "CRITDEFPRATPCAPR") {
					if (SN < "CHAMPIONCDHASPOWER") {
						if (SN < "CAPTAINCDCANBLOCK") {
							if (SN < "CAPTAINCDCALCTYPECOMPHYMIT") {
								if (SN > "BURGLARCDHASPOWER") {
									if (SN == "CAPTAINCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "BURGLARCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CAPTAINCDCALCTYPECOMPHYMIT") {
								if (SN > "CAPTAINCDCALCTYPENONPHYMIT") {
									if (SN == "CAPTAINCDCALCTYPETACMIT") {
										return 27;
									} else {
										return 0;
									}
								} else if (SN == "CAPTAINCDCALCTYPENONPHYMIT") {
									return 14;
								} else {
									return 0;
								}
							} else {
								return 14;
							}
						} else if (SN > "CAPTAINCDCANBLOCK") {
							if (SN < "CHAMPIONCDCALCTYPECOMPHYMIT") {
								if (SN > "CAPTAINCDHASPOWER") {
									if (SN == "CHAMPIONCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "CAPTAINCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CHAMPIONCDCALCTYPECOMPHYMIT") {
								if (SN < "CHAMPIONCDCALCTYPETACMIT") {
									if (SN == "CHAMPIONCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else if (SN > "CHAMPIONCDCALCTYPETACMIT") {
									if (SN == "CHAMPIONCDCANBLOCK") {
										if (Lm <= 5) {
											return 0;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else {
									return 27;
								}
							} else {
								return 14;
							}
						} else {
							if (Lm <= 14) {
								return 0;
							} else {
								return 1;
							}
						}
					} else if (SN > "CHAMPIONCDHASPOWER") {
						if (SN < "CRITDEFPBONUS") {
							if (SN < "CHICKENCDCALCTYPENONPHYMIT") {
								if (SN > "CHICKENCANBLOCK") {
									if (SN == "CHICKENCDCALCTYPECOMPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else if (SN == "CHICKENCANBLOCK") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CHICKENCDCALCTYPENONPHYMIT") {
								if (SN > "CHICKENCDCALCTYPETACMIT") {
									if (SN == "CHICKENCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "CHICKENCDCALCTYPETACMIT") {
									return 27;
								} else {
									return 0;
								}
							} else {
								return 14;
							}
						} else if (SN > "CRITDEFPBONUS") {
							if (SN < "CRITDEFPRATPA") {
								if (SN > "CRITDEFPPRAT") {
									if (SN == "CRITDEFPRATP") {
										return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPPRAT") {
									return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATPA") {
								if (SN < "CRITDEFPRATPC") {
									if (SN == "CRITDEFPRATPB") {
										return CalcStat("BRatRounded",L,"BRatStandard");
									} else {
										return 0;
									}
								} else if (SN > "CRITDEFPRATPC") {
									if (SN == "CRITDEFPRATPCAP") {
										return 80;
									} else {
										return 0;
									}
								} else {
									return 0.5;
								}
							} else {
								return 240;
							}
						} else {
							return 0;
						}
					} else {
						return 1;
					}
				} else if (SN > "CRITDEFPRATPCAPR") {
					if (SN < "CRITMAGNPRATPB") {
						if (SN < "CRITHITPRATPC") {
							if (SN < "CRITHITPRATP") {
								if (SN > "CRITHITPBONUS") {
									if (SN == "CRITHITPPRAT") {
										return CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATP") {
								if (SN > "CRITHITPRATPA") {
									if (SN == "CRITHITPRATPB") {
										return CalcStat("BRatRounded",L,"BRatExtra");
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPA") {
									return 75;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
							}
						} else if (SN > "CRITHITPRATPC") {
							if (SN < "CRITMAGNPBONUS") {
								if (SN > "CRITHITPRATPCAP") {
									if (SN == "CRITHITPRATPCAPR") {
										return CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPBONUS") {
								if (SN < "CRITMAGNPRATP") {
									if (SN == "CRITMAGNPPRAT") {
										return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN > "CRITMAGNPRATP") {
									if (SN == "CRITMAGNPRATPA") {
										return 225;
									} else {
										return 0;
									}
								} else {
									return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
								}
							} else {
								return 0;
							}
						} else {
							return 0.5;
						}
					} else if (SN > "CRITMAGNPRATPB") {
						if (SN < "DEFILERCDCALCTYPETACMIT") {
							if (SN < "CRITMAGNPRATPCAPR") {
								if (SN > "CRITMAGNPRATPC") {
									if (SN == "CRITMAGNPRATPCAP") {
										return 75;
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPCAPR") {
								if (SN < "DEFILERCDCALCTYPECOMPHYMIT") {
									if (SN == "DEFILERCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN > "DEFILERCDCALCTYPECOMPHYMIT") {
									if (SN == "DEFILERCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else {
									return 13;
								}
							} else {
								return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
							}
						} else if (SN > "DEFILERCDCALCTYPETACMIT") {
							if (SN < "DEVHITPPRAT") {
								if (SN > "DEFILERCDHASPOWER") {
									if (SN == "DEVHITPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "DEFILERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPPRAT") {
								if (SN < "DEVHITPRATPA") {
									if (SN == "DEVHITPRATP") {
										return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN > "DEVHITPRATPA") {
									if (SN == "DEVHITPRATPB") {
										return CalcStat("BRatRounded",L,"BRatDevHit");
									} else {
										return 0;
									}
								} else {
									return 30;
								}
							} else {
								return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
							}
						} else {
							return 27;
						}
					} else {
						return CalcStat("BRatRounded",L,"BRatCritMagn");
					}
				} else {
					return CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
				}
			} else {
				return 26;
			}
		} else if (SN > "DEVHITPRATPC") {
			if (SN < "LVLEXPCOST") {
				if (SN < "HUNTERCDCALCTYPECOMPHYMIT") {
					if (SN < "FINESSEPRATP") {
						if (SN < "EVADEPRATPA") {
							if (SN < "EVADEPBONUS") {
								if (SN > "DEVHITPRATPCAP") {
									if (SN == "DEVHITPRATPCAPR") {
										return CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATPCAP") {
									return 10;
								} else {
									return 0;
								}
							} else if (SN > "EVADEPBONUS") {
								if (SN > "EVADEPPRAT") {
									if (SN == "EVADEPRATP") {
										return CalcStat("BPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPBonus",L);
							}
						} else if (SN > "EVADEPRATPA") {
							if (SN < "EVADEPRATPCAP") {
								if (SN > "EVADEPRATPB") {
									if (SN == "EVADEPRATPC") {
										return CalcStat("BPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPCAP") {
								if (SN < "FINESSEPBONUS") {
									if (SN == "EVADEPRATPCAPR") {
										return CalcStat("BPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN > "FINESSEPBONUS") {
									if (SN == "FINESSEPPRAT") {
										return CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
									} else {
										return 0;
									}
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else {
							return CalcStat("BPEPRatPA",L);
						}
					} else if (SN > "FINESSEPRATP") {
						if (SN < "GUARDIANCDARMOURTYPE") {
							if (SN < "FINESSEPRATPC") {
								if (SN > "FINESSEPRATPA") {
									if (SN == "FINESSEPRATPB") {
										return CalcStat("BRatRounded",L,"BRatStandard");
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPA") {
									return 150;
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATPC") {
								if (SN > "FINESSEPRATPCAP") {
									if (SN == "FINESSEPRATPCAPR") {
										return CalcStat("FinessePRatPB",L)*CalcStat("FinessePRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else if (SN > "GUARDIANCDARMOURTYPE") {
							if (SN < "GUARDIANCDCALCTYPETACMIT") {
								if (SN > "GUARDIANCDCALCTYPECOMPHYMIT") {
									if (SN == "GUARDIANCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else if (SN == "GUARDIANCDCALCTYPECOMPHYMIT") {
									return 14;
								} else {
									return 0;
								}
							} else if (SN > "GUARDIANCDCALCTYPETACMIT") {
								if (SN < "GUARDIANCDHASPOWER") {
									if (SN == "GUARDIANCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN > "GUARDIANCDHASPOWER") {
									if (SN == "HUNTERCDARMOURTYPE") {
										return 2;
									} else {
										return 0;
									}
								} else {
									return 1;
								}
							} else {
								return 27;
							}
						} else {
							return 3;
						}
					} else {
						return CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
					}
				} else if (SN > "HUNTERCDCALCTYPECOMPHYMIT") {
					if (SN < "INHEALPPRAT") {
						if (SN < "INDMGPRATP") {
							if (SN < "HUNTERCDHASPOWER") {
								if (SN > "HUNTERCDCALCTYPENONPHYMIT") {
									if (SN == "HUNTERCDCALCTYPETACMIT") {
										return 26;
									} else {
										return 0;
									}
								} else if (SN == "HUNTERCDCALCTYPENONPHYMIT") {
									return 13;
								} else {
									return 0;
								}
							} else if (SN > "HUNTERCDHASPOWER") {
								if (SN > "INDMGPBONUS") {
									if (SN == "INDMGPPRAT") {
										return CalcRatAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INDMGPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "INDMGPRATP") {
							if (SN < "INDMGPRATPC") {
								if (SN > "INDMGPRATPA") {
									if (SN == "INDMGPRATPB") {
										return CalcStat("BRatRounded",L,"BRatStandard");
									} else {
										return 0;
									}
								} else if (SN == "INDMGPRATPA") {
									return 1200;
								} else {
									return 0;
								}
							} else if (SN > "INDMGPRATPC") {
								if (SN < "INDMGPRATPCAPR") {
									if (SN == "INDMGPRATPCAP") {
										return 400;
									} else {
										return 0;
									}
								} else if (SN > "INDMGPRATPCAPR") {
									if (SN == "INHEALPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else {
									return CalcStat("InDmgPRatPB",L)*CalcStat("InDmgPRatPC",L);
								}
							} else {
								return 0.5;
							}
						} else {
							return CalcPercAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCap",L),N);
						}
					} else if (SN > "INHEALPPRAT") {
						if (SN < "INHEALPRATPCAPR") {
							if (SN < "INHEALPRATPB") {
								if (SN > "INHEALPRATP") {
									if (SN == "INHEALPRATPA") {
										return 75;
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATP") {
									return CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "INHEALPRATPB") {
								if (SN > "INHEALPRATPC") {
									if (SN == "INHEALPRATPCAP") {
										return 25;
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatStandard");
							}
						} else if (SN > "INHEALPRATPCAPR") {
							if (SN < "LOREMASTERCDCALCTYPECOMPHYMIT") {
								if (SN > "LEVELCAP") {
									if (SN == "LOREMASTERCDARMOURTYPE") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "LEVELCAP") {
									return 150;
								} else {
									return 0;
								}
							} else if (SN > "LOREMASTERCDCALCTYPECOMPHYMIT") {
								if (SN < "LOREMASTERCDCALCTYPETACMIT") {
									if (SN == "LOREMASTERCDCALCTYPENONPHYMIT") {
										return 12;
									} else {
										return 0;
									}
								} else if (SN > "LOREMASTERCDCALCTYPETACMIT") {
									if (SN == "LOREMASTERCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else {
									return 25;
								}
							} else {
								return 12;
							}
						} else {
							return CalcStat("InHealPRatPB",L)*CalcStat("InHealPRatPC",L);
						}
					} else {
						return CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
					}
				} else {
					return 13;
				}
			} else if (SN > "LVLEXPCOST") {
				if (SN < "MITLIGHTPRATPC") {
					if (SN < "MITHEAVYPBONUS") {
						if (SN < "MARINERCDHASPOWER") {
							if (SN < "MARINERCDCALCTYPECOMPHYMIT") {
								if (SN > "LVLEXPCOSTTOT") {
									if (SN == "MARINERCDARMOURTYPE") {
										return 2;
									} else {
										return 0;
									}
								} else if (SN == "LVLEXPCOSTTOT") {
									if (Lm <= 1) {
										return 0;
									} else {
										return CalcStat("LvlExpCostTot",L-1)+CalcStat("LvlExpCost",L);
									}
								} else {
									return 0;
								}
							} else if (SN > "MARINERCDCALCTYPECOMPHYMIT") {
								if (SN > "MARINERCDCALCTYPENONPHYMIT") {
									if (SN == "MARINERCDCALCTYPETACMIT") {
										return 26;
									} else {
										return 0;
									}
								} else if (SN == "MARINERCDCALCTYPENONPHYMIT") {
									return 13;
								} else {
									return 0;
								}
							} else {
								return 13;
							}
						} else if (SN > "MARINERCDHASPOWER") {
							if (SN < "MINSTRELCDCALCTYPENONPHYMIT") {
								if (SN > "MINSTRELCDARMOURTYPE") {
									if (SN == "MINSTRELCDCALCTYPECOMPHYMIT") {
										return 12;
									} else {
										return 0;
									}
								} else if (SN == "MINSTRELCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "MINSTRELCDCALCTYPENONPHYMIT") {
								if (SN < "MINSTRELCDCANBLOCK") {
									if (SN == "MINSTRELCDCALCTYPETACMIT") {
										return 25;
									} else {
										return 0;
									}
								} else if (SN > "MINSTRELCDCANBLOCK") {
									if (SN == "MINSTRELCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else {
									if (Lm <= 19) {
										return 0;
									} else {
										return 1;
									}
								}
							} else {
								return 12;
							}
						} else {
							return 1;
						}
					} else if (SN > "MITHEAVYPBONUS") {
						if (SN < "MITHEAVYPRATPCAP") {
							if (SN < "MITHEAVYPRATPA") {
								if (SN > "MITHEAVYPPRAT") {
									if (SN == "MITHEAVYPRATP") {
										return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPPRAT") {
									return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPA") {
								if (SN > "MITHEAVYPRATPB") {
									if (SN == "MITHEAVYPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPB") {
									return CalcStat("BRatRounded",L,"BRatMitHeavy");
								} else {
									return 0;
								}
							} else {
								return 180;
							}
						} else if (SN > "MITHEAVYPRATPCAP") {
							if (SN < "MITLIGHTPPRAT") {
								if (SN > "MITHEAVYPRATPCAPR") {
									if (SN == "MITLIGHTPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPCAPR") {
									return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPPRAT") {
								if (SN < "MITLIGHTPRATPA") {
									if (SN == "MITLIGHTPRATP") {
										return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN > "MITLIGHTPRATPA") {
									if (SN == "MITLIGHTPRATPB") {
										return CalcStat("BRatRounded",L,"BRatMitLight");
									} else {
										return 0;
									}
								} else {
									return 120;
								}
							} else {
								return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
							}
						} else {
							return 60;
						}
					} else {
						return 0;
					}
				} else if (SN > "MITLIGHTPRATPC") {
					if (SN < "OUTDMGPRATP") {
						if (SN < "MITMEDIUMPRATPA") {
							if (SN < "MITMEDIUMPBONUS") {
								if (SN > "MITLIGHTPRATPCAP") {
									if (SN == "MITLIGHTPRATPCAPR") {
										return CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATPCAP") {
									return 40;
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPBONUS") {
								if (SN > "MITMEDIUMPPRAT") {
									if (SN == "MITMEDIUMPRATP") {
										return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPPRAT") {
									return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "MITMEDIUMPRATPA") {
							if (SN < "MITMEDIUMPRATPCAP") {
								if (SN > "MITMEDIUMPRATPB") {
									if (SN == "MITMEDIUMPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPB") {
									return CalcStat("BRatRounded",L,"BRatMitMedium");
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATPCAP") {
								if (SN < "OUTDMGPBONUS") {
									if (SN == "MITMEDIUMPRATPCAPR") {
										return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN > "OUTDMGPBONUS") {
									if (SN == "OUTDMGPPRAT") {
										return CalcRatAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else {
									return 0;
								}
							} else {
								return 50;
							}
						} else {
							return 150;
						}
					} else if (SN > "OUTDMGPRATP") {
						if (SN < "OUTHEALPPRAT") {
							if (SN < "OUTDMGPRATPC") {
								if (SN > "OUTDMGPRATPA") {
									if (SN == "OUTDMGPRATPB") {
										return CalcStat("BRatRounded",L,"BRatExtra");
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPRATPA") {
									return 600;
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPRATPC") {
								if (SN < "OUTDMGPRATPCAPR") {
									if (SN == "OUTDMGPRATPCAP") {
										return 200;
									} else {
										return 0;
									}
								} else if (SN > "OUTDMGPRATPCAPR") {
									if (SN == "OUTHEALPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else {
									return CalcStat("OutDmgPRatPB",L)*CalcStat("OutDmgPRatPC",L);
								}
							} else {
								return 0.5;
							}
						} else if (SN > "OUTHEALPPRAT") {
							if (SN < "OUTHEALPRATPB") {
								if (SN > "OUTHEALPRATP") {
									if (SN == "OUTHEALPRATPA") {
										return 210;
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATP") {
									return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATPB") {
								if (SN < "OUTHEALPRATPCAP") {
									if (SN == "OUTHEALPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN > "OUTHEALPRATPCAP") {
									if (SN == "OUTHEALPRATPCAPR") {
										return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
									} else {
										return 0;
									}
								} else {
									return 70;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatOutHeal");
							}
						} else {
							return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
						}
					} else {
						return CalcPercAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCap",L),N);
					}
				} else {
					return 0.5;
				}
			} else {
				if (Lm <= 1) {
					return 0;
				} else if (Lm <= 5) {
					return RoundDbl(12.5*L*L+12.5666666666667*L+24.8666666666667);
				} else if (Lm <= 10) {
					return RoundDbl(33.8*L*L-179.48*L+452.6);
				} else if (Lm <= 15) {
					return RoundDbl(55.05*L*L-583.77*L+2370.5);
				} else if (Lm <= 20) {
					return RoundDbl(76.2*L*L-1196.96*L+6809);
				} else if (Lm <= 25) {
					return RoundDbl(97.4*L*L-2023*L+14849.8);
				} else if (Lm <= 30) {
					return RoundDbl(118.7*L*L-3066.02 *L+27612.8);
				} else if (Lm <= 35) {
					return RoundDbl(139.95*L*L-4319.23*L+46084.1);
				} else if (Lm <= 40) {
					return RoundDbl(161.2*L*L-5785.04*L+71356.2);
				} else if (Lm <= 45) {
					return RoundDbl(182.5*L*L-7467.38*L+104569.8);
				} else if (Lm <= 50) {
					return RoundDbl(203.8*L*L-9363.48*L+146761.8);
				} else if (Lm <= 55) {
					return RoundDbl(225.05*L*L-11467.77*L+198851.3);
				} else if (Lm <= 60) {
					return RoundDbl(246.3*L*L-13784.46*L+261988);
				} else if (Lm <= 70) {
					return RoundDbl(ExpFmod(CalcStat("LvlExpCost",60),61,5.071,L,undefined,3.485));
				} else if (Lm <= 75) {
					return RoundDbl(ExpFmod(CalcStat("LvlExpCost",70),71,5.072,L,undefined,-0.95));
				} else {
					return ExpFmod(CalcStat("LvlExpCost",75),76,5,L,0,-0.5);
				}
			}
		} else {
			return 0.5;
		}
	} else if (SN > "PARRYPBONUS") {
		if (SN < "PHYMITLPPRAT") {
			if (SN < "PARTFINESSEDMGPRATPB") {
				if (SN < "PARTBPEPRATP") {
					if (SN < "PARTBLOCKMITPRATPC") {
						if (SN < "PARRYPRATPCAP") {
							if (SN < "PARRYPRATPA") {
								if (SN > "PARRYPPRAT") {
									if (SN == "PARRYPRATP") {
										return CalcStat("BPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPA") {
								if (SN > "PARRYPRATPB") {
									if (SN == "PARRYPRATPC") {
										return CalcStat("BPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPA",L);
							}
						} else if (SN > "PARRYPRATPCAP") {
							if (SN < "PARTBLOCKMITPPRAT") {
								if (SN > "PARRYPRATPCAPR") {
									if (SN == "PARTBLOCKMITPBONUS") {
										return CalcStat("PartMitPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPPRAT") {
								if (SN < "PARTBLOCKMITPRATPA") {
									if (SN == "PARTBLOCKMITPRATP") {
										return CalcStat("PartMitPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN > "PARTBLOCKMITPRATPA") {
									if (SN == "PARTBLOCKMITPRATPB") {
										return CalcStat("PartMitPRatPB",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("PartMitPRatPA",L);
								}
							} else {
								return CalcStat("PartMitPPRat",L,N);
							}
						} else {
							return CalcStat("BPEPRatPCap",L);
						}
					} else if (SN > "PARTBLOCKMITPRATPC") {
						if (SN < "PARTBLOCKPRATPA") {
							if (SN < "PARTBLOCKPBONUS") {
								if (SN > "PARTBLOCKMITPRATPCAP") {
									if (SN == "PARTBLOCKMITPRATPCAPR") {
										return CalcStat("PartMitPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPCAP") {
									return CalcStat("PartMitPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPBONUS") {
								if (SN > "PARTBLOCKPPRAT") {
									if (SN == "PARTBLOCKPRATP") {
										return CalcStat("PartBPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPPRAT") {
									return CalcStat("PartBPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPBonus",L);
							}
						} else if (SN > "PARTBLOCKPRATPA") {
							if (SN < "PARTBLOCKPRATPCAP") {
								if (SN > "PARTBLOCKPRATPB") {
									if (SN == "PARTBLOCKPRATPC") {
										return CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPCAP") {
								if (SN < "PARTBPEPBONUS") {
									if (SN == "PARTBLOCKPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN > "PARTBPEPBONUS") {
									if (SN == "PARTBPEPPRAT") {
										return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCap",L);
							}
						} else {
							return CalcStat("PartBPEPRatPA",L);
						}
					} else {
						return CalcStat("PartMitPRatPC",L);
					}
				} else if (SN > "PARTBPEPRATP") {
					if (SN < "PARTEVADEMITPRATPCAPR") {
						if (SN < "PARTEVADEMITPBONUS") {
							if (SN < "PARTBPEPRATPC") {
								if (SN > "PARTBPEPRATPA") {
									if (SN == "PARTBPEPRATPB") {
										return CalcStat("BRatRounded",L,"BRatPartBPE");
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPA") {
									return 75;
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATPC") {
								if (SN > "PARTBPEPRATPCAP") {
									if (SN == "PARTBPEPRATPCAPR") {
										return CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else if (SN > "PARTEVADEMITPBONUS") {
							if (SN < "PARTEVADEMITPRATPA") {
								if (SN > "PARTEVADEMITPPRAT") {
									if (SN == "PARTEVADEMITPRATP") {
										return CalcStat("PartMitPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPPRAT") {
									return CalcStat("PartMitPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPRATPA") {
								if (SN < "PARTEVADEMITPRATPC") {
									if (SN == "PARTEVADEMITPRATPB") {
										return CalcStat("PartMitPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN > "PARTEVADEMITPRATPC") {
									if (SN == "PARTEVADEMITPRATPCAP") {
										return CalcStat("PartMitPRatPCap",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("PartMitPRatPC",L);
								}
							} else {
								return CalcStat("PartMitPRatPA",L);
							}
						} else {
							return CalcStat("PartMitPBonus",L);
						}
					} else if (SN > "PARTEVADEMITPRATPCAPR") {
						if (SN < "PARTEVADEPRATPC") {
							if (SN < "PARTEVADEPRATP") {
								if (SN > "PARTEVADEPBONUS") {
									if (SN == "PARTEVADEPPRAT") {
										return CalcStat("PartBPEPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPBONUS") {
									return CalcStat("PartBPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATP") {
								if (SN > "PARTEVADEPRATPA") {
									if (SN == "PARTEVADEPRATPB") {
										return CalcStat("PartBPEPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATPA") {
									return CalcStat("PartBPEPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatP",L,N);
							}
						} else if (SN > "PARTEVADEPRATPC") {
							if (SN < "PARTFINESSEDMGPBONUS") {
								if (SN > "PARTEVADEPRATPCAP") {
									if (SN == "PARTEVADEPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTFINESSEDMGPBONUS") {
								if (SN < "PARTFINESSEDMGPRATP") {
									if (SN == "PARTFINESSEDMGPPRAT") {
										return CalcRatAB(CalcStat("PartFinesseDmgPRatPA",L),CalcStat("PartFinesseDmgPRatPB",L),CalcStat("PartFinesseDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN > "PARTFINESSEDMGPRATP") {
									if (SN == "PARTFINESSEDMGPRATPA") {
										return 150;
									} else {
										return 0;
									}
								} else {
									return CalcPercAB(CalcStat("PartFinesseDmgPRatPA",L),CalcStat("PartFinesseDmgPRatPB",L),CalcStat("PartFinesseDmgPRatPCap",L),N);
								}
							} else {
								return 0;
							}
						} else {
							return CalcStat("PartBPEPRatPC",L);
						}
					} else {
						return CalcStat("PartMitPRatPCapR",L);
					}
				} else {
					return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
				}
			} else if (SN > "PARTFINESSEDMGPRATPB") {
				if (SN < "PARTPARRYMITPRATPCAP") {
					if (SN < "PARTMITPPRAT") {
						if (SN < "PARTFINESSEPRATP") {
							if (SN < "PARTFINESSEDMGPRATPCAPR") {
								if (SN > "PARTFINESSEDMGPRATPC") {
									if (SN == "PARTFINESSEDMGPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "PARTFINESSEDMGPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "PARTFINESSEDMGPRATPCAPR") {
								if (SN > "PARTFINESSEPBONUS") {
									if (SN == "PARTFINESSEPPRAT") {
										return CalcRatAB(CalcStat("PartFinessePRatPA",L),CalcStat("PartFinessePRatPB",L),CalcStat("PartFinessePRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PARTFINESSEPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartFinesseDmgPRatPB",L)*CalcStat("PartFinesseDmgPRatPC",L);
							}
						} else if (SN > "PARTFINESSEPRATP") {
							if (SN < "PARTFINESSEPRATPC") {
								if (SN > "PARTFINESSEPRATPA") {
									if (SN == "PARTFINESSEPRATPB") {
										return CalcStat("BRatRounded",L,"BRatStandard");
									} else {
										return 0;
									}
								} else if (SN == "PARTFINESSEPRATPA") {
									return 150;
								} else {
									return 0;
								}
							} else if (SN > "PARTFINESSEPRATPC") {
								if (SN < "PARTFINESSEPRATPCAPR") {
									if (SN == "PARTFINESSEPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN > "PARTFINESSEPRATPCAPR") {
									if (SN == "PARTMITPBONUS") {
										return 0.1;
									} else {
										return 0;
									}
								} else {
									return CalcStat("PartFinessePRatPB",L)*CalcStat("PartFinessePRatPC",L);
								}
							} else {
								return 0.5;
							}
						} else {
							return CalcPercAB(CalcStat("PartFinessePRatPA",L),CalcStat("PartFinessePRatPB",L),CalcStat("PartFinessePRatPCap",L),N);
						}
					} else if (SN > "PARTMITPPRAT") {
						if (SN < "PARTMITPRATPCAPR") {
							if (SN < "PARTMITPRATPB") {
								if (SN > "PARTMITPRATP") {
									if (SN == "PARTMITPRATPA") {
										return 105;
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATP") {
									return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPB") {
								if (SN > "PARTMITPRATPC") {
									if (SN == "PARTMITPRATPCAP") {
										return 35;
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatPartBPE");
							}
						} else if (SN > "PARTMITPRATPCAPR") {
							if (SN < "PARTPARRYMITPRATP") {
								if (SN > "PARTPARRYMITPBONUS") {
									if (SN == "PARTPARRYMITPPRAT") {
										return CalcStat("PartMitPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATP") {
								if (SN < "PARTPARRYMITPRATPB") {
									if (SN == "PARTPARRYMITPRATPA") {
										return CalcStat("PartMitPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN > "PARTPARRYMITPRATPB") {
									if (SN == "PARTPARRYMITPRATPC") {
										return CalcStat("PartMitPRatPC",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("PartMitPRatPB",L);
								}
							} else {
								return CalcStat("PartMitPRatP",L,N);
							}
						} else {
							return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
						}
					} else {
						return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
					}
				} else if (SN > "PARTPARRYMITPRATPCAP") {
					if (SN < "PHYDMGPRATPA") {
						if (SN < "PARTPARRYPRATPB") {
							if (SN < "PARTPARRYPPRAT") {
								if (SN > "PARTPARRYMITPRATPCAPR") {
									if (SN == "PARTPARRYPBONUS") {
										return CalcStat("PartBPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPPRAT") {
								if (SN > "PARTPARRYPRATP") {
									if (SN == "PARTPARRYPRATPA") {
										return CalcStat("PartBPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPPRat",L,N);
							}
						} else if (SN > "PARTPARRYPRATPB") {
							if (SN < "PARTPARRYPRATPCAPR") {
								if (SN > "PARTPARRYPRATPC") {
									if (SN == "PARTPARRYPRATPCAP") {
										return CalcStat("PartBPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATPC") {
									return CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPCAPR") {
								if (SN < "PHYDMGPPRAT") {
									if (SN == "PHYDMGPBONUS") {
										return CalcStat("OutDmgPBonus",L);
									} else {
										return 0;
									}
								} else if (SN > "PHYDMGPPRAT") {
									if (SN == "PHYDMGPRATP") {
										return CalcStat("OutDmgPRatP",L,N);
									} else {
										return 0;
									}
								} else {
									return CalcStat("OutDmgPPRat",L,N);
								}
							} else {
								return CalcStat("PartBPEPRatPCapR",L);
							}
						} else {
							return CalcStat("PartBPEPRatPB",L);
						}
					} else if (SN > "PHYDMGPRATPA") {
						if (SN < "PHYMITHPRATP") {
							if (SN < "PHYDMGPRATPCAP") {
								if (SN > "PHYDMGPRATPB") {
									if (SN == "PHYDMGPRATPC") {
										return CalcStat("OutDmgPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPB") {
									return CalcStat("OutDmgPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPCAP") {
								if (SN < "PHYMITHPBONUS") {
									if (SN == "PHYDMGPRATPCAPR") {
										return CalcStat("OutDmgPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN > "PHYMITHPBONUS") {
									if (SN == "PHYMITHPPRAT") {
										return CalcStat("MitHeavyPPRat",L,N);
									} else {
										return 0;
									}
								} else {
									return CalcStat("MitHeavyPBonus",L);
								}
							} else {
								return CalcStat("OutDmgPRatPCap",L);
							}
						} else if (SN > "PHYMITHPRATP") {
							if (SN < "PHYMITHPRATPC") {
								if (SN > "PHYMITHPRATPA") {
									if (SN == "PHYMITHPRATPB") {
										return CalcStat("MitHeavyPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPA") {
									return CalcStat("MitHeavyPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATPC") {
								if (SN < "PHYMITHPRATPCAPR") {
									if (SN == "PHYMITHPRATPCAP") {
										return CalcStat("MitHeavyPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN > "PHYMITHPRATPCAPR") {
									if (SN == "PHYMITLPBONUS") {
										return CalcStat("MitLightPBonus",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("MitHeavyPRatPCapR",L);
								}
							} else {
								return CalcStat("MitHeavyPRatPC",L);
							}
						} else {
							return CalcStat("MitHeavyPRatP",L,N);
						}
					} else {
						return CalcStat("OutDmgPRatPA",L);
					}
				} else {
					return CalcStat("PartMitPRatPCap",L);
				}
			} else {
				return CalcStat("BRatRounded",L,"BRatStandard");
			}
		} else if (SN > "PHYMITLPPRAT") {
			if (SN < "TACDMGPBONUS") {
				if (SN < "REAVERCDCALCTYPETACMIT") {
					if (SN < "PHYMITMPRATPCAP") {
						if (SN < "PHYMITLPRATPCAPR") {
							if (SN < "PHYMITLPRATPB") {
								if (SN > "PHYMITLPRATP") {
									if (SN == "PHYMITLPRATPA") {
										return CalcStat("MitLightPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATP") {
									return CalcStat("MitLightPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPB") {
								if (SN > "PHYMITLPRATPC") {
									if (SN == "PHYMITLPRATPCAP") {
										return CalcStat("MitLightPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATPC") {
									return CalcStat("MitLightPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPB",L);
							}
						} else if (SN > "PHYMITLPRATPCAPR") {
							if (SN < "PHYMITMPRATP") {
								if (SN > "PHYMITMPBONUS") {
									if (SN == "PHYMITMPPRAT") {
										return CalcStat("MitMediumPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPBONUS") {
									return CalcStat("MitMediumPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATP") {
								if (SN < "PHYMITMPRATPB") {
									if (SN == "PHYMITMPRATPA") {
										return CalcStat("MitMediumPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN > "PHYMITMPRATPB") {
									if (SN == "PHYMITMPRATPC") {
										return CalcStat("MitMediumPRatPC",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("MitMediumPRatPB",L);
								}
							} else {
								return CalcStat("MitMediumPRatP",L,N);
							}
						} else {
							return CalcStat("MitLightPRatPCapR",L);
						}
					} else if (SN > "PHYMITMPRATPCAP") {
						if (SN < "PROGBBPE") {
							if (SN < "PNTMPBPE") {
								if (SN > "PHYMITMPRATPCAPR") {
									if (SN == "PNTMPARMOURPENT") {
										return 72/1200;
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPRATPCAPR") {
									return CalcStat("MitMediumPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PNTMPBPE") {
								if (SN > "PNTMPRESIST") {
									if (SN == "PROGBARMOUR") {
										return CalcStat("BRatProgB",L,"BRatMitMedium");
									} else {
										return 0;
									}
								} else if (SN == "PNTMPRESIST") {
									return 36/1200;
								} else {
									return 0;
								}
							} else {
								return 42/1200;
							}
						} else if (SN > "PROGBBPE") {
							if (SN < "PROGEXTCOMLOWRAW") {
								if (SN > "PROGBRESIST") {
									if (SN == "PROGEXTCOMHIGHRAW") {
										if (Lm <= 121) {
											return ExpFmod(N,121,20,L);
										} else if (Lm <= 125) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
										} else if (Lm <= 126) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
										} else if (Lm <= 130) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
										} else if (Lm <= 131) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",130,N),131,20,L);
										} else if (Lm <= 150) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",131,N),132,5.5,L);
										} else {
											return CalcStat("ProgExtComHighRaw",150,N);
										}
									} else {
										return 0;
									}
								} else if (SN == "PROGBRESIST") {
									return CalcStat("BRatProgB",L,"BRatExtra");
								} else {
									return 0;
								}
							} else if (SN > "PROGEXTCOMLOWRAW") {
								if (SN < "REAVERCDCALCTYPECOMPHYMIT") {
									if (SN == "REAVERCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN > "REAVERCDCALCTYPECOMPHYMIT") {
									if (SN == "REAVERCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else {
									return 13;
								}
							} else {
								if (Lm <= 116) {
									return ExpFmod(N,116,20,L);
								} else if (Lm <= 120) {
									return ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
								} else {
									return CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
								}
							}
						} else {
							return CalcStat("BRatProgB",L,"BRatStandard");
						}
					} else {
						return CalcStat("MitMediumPRatPCap",L);
					}
				} else if (SN > "REAVERCDCALCTYPETACMIT") {
					if (SN < "RUNEKEEPERCDCALCTYPENONPHYMIT") {
						if (SN < "RESISTPRATPB") {
							if (SN < "RESISTPPRAT") {
								if (SN > "REAVERCDHASPOWER") {
									if (SN == "RESISTPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "REAVERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPPRAT") {
								if (SN > "RESISTPRATP") {
									if (SN == "RESISTPRATPA") {
										return 150;
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATP") {
									return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
							}
						} else if (SN > "RESISTPRATPB") {
							if (SN < "RESISTPRATPCAPR") {
								if (SN > "RESISTPRATPC") {
									if (SN == "RESISTPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPCAPR") {
								if (SN < "RUNEKEEPERCDARMOURTYPE") {
									if (SN == "RESISTT") {
										return StatLinInter("PntMPResist","TraitProg","ProgBResist","AdjUmbarTrait",L,N,0);
									} else {
										return 0;
									}
								} else if (SN > "RUNEKEEPERCDARMOURTYPE") {
									if (SN == "RUNEKEEPERCDCALCTYPECOMPHYMIT") {
										return 12;
									} else {
										return 0;
									}
								} else {
									return 1;
								}
							} else {
								return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
							}
						} else {
							return CalcStat("BRatRounded",L,"BRatExtra");
						}
					} else if (SN > "RUNEKEEPERCDCALCTYPENONPHYMIT") {
						if (SN < "STALKERCDCALCTYPETACMIT") {
							if (SN < "STALKERCANBLOCK") {
								if (SN > "RUNEKEEPERCDCALCTYPETACMIT") {
									if (SN == "RUNEKEEPERCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "RUNEKEEPERCDCALCTYPETACMIT") {
									return 25;
								} else {
									return 0;
								}
							} else if (SN > "STALKERCANBLOCK") {
								if (SN > "STALKERCDCALCTYPECOMPHYMIT") {
									if (SN == "STALKERCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else if (SN == "STALKERCDCALCTYPECOMPHYMIT") {
									return 13;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "STALKERCDCALCTYPETACMIT") {
							if (SN < "T2PENARMOUR") {
								if (SN > "STALKERCDHASPOWER") {
									if (SN == "STDPROG") {
										if (Lm <= 50) {
											return LinFmod(N,1,10,1,50,L,"P");
										} else if (Lm <= 60) {
											return LinFmod(CalcStat("StdProg",50,N),10/10,15/10,50,60,L,"P");
										} else if (Lm <= 65) {
											return LinFmod(CalcStat("StdProg",60,N),15/15,20/15,60,65,L,"P");
										} else if (Lm <= 75) {
											return LinFmod(CalcStat("StdProg",65,N),20/20,30/20,65,75,L,"P");
										} else if (Lm <= 85) {
											return LinFmod(CalcStat("StdProg",75,N),30/30,45/30,75,85,L,"P");
										} else if (Lm <= 95) {
											return LinFmod(CalcStat("StdProg",85,N),45/45,65/45,85,95,L,"P");
										} else if (Lm <= 100) {
											return LinFmod(CalcStat("StdProg",95,N),65/65,90.3/65,95,100,L,"P");
										} else if (Lm <= 105) {
											return LinFmod(CalcStat("StdProg",100,N),90.3/90.3,120.3/90.3,100,105,L,"P");
										} else if (Lm <= 115) {
											return LinFmod(CalcStat("StdProg",105,N),1.1,1.5,106,115,L,"P");
										} else if (Lm <= 120) {
											return LinFmod(CalcStat("StdProg",115,N),1.15,1.25,116,120,L,"P");
										} else if (Lm <= 130) {
											return LinFmod(CalcStat("StdProg",120,N),1.15,1.5,121,130,L,"P");
										} else if (Lm <= 140) {
											return LinFmod(CalcStat("StdProg",130,N),1.15,2,131,140,L,"P");
										} else if (Lm <= 150) {
											return LinFmod(CalcStat("StdProg",140,N),1.3,2.205,141,150,L,"P");
										} else {
											return LinFmod(CalcStat("StdProg",150,N),1,2,151,160,L,"P");
										}
									} else {
										return 0;
									}
								} else if (SN == "STALKERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "T2PENARMOUR") {
								if (SN < "T2PENMIT") {
									if (SN == "T2PENBPE") {
										if (Lm <= 115) {
											return (-40)*L;
										} else {
											return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenBPE",115));
										}
									} else {
										return 0;
									}
								} else if (SN > "T2PENMIT") {
									if (SN == "T2PENRESIST") {
										if (Lm <= 115) {
											return (-90)*L;
										} else {
											return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenResist",115));
										}
									} else {
										return 0;
									}
								} else {
									if (Lm <= 115) {
										return RoundDblDown(L*13.5)*-5;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenMit",115));
									}
								}
							} else {
								return CalcStat("T2penMit",L);
							}
						} else {
							return 27;
						}
					} else {
						return 12;
					}
				} else {
					return 27;
				}
			} else if (SN > "TACDMGPBONUS") {
				if (SN < "TACMITMPRATP") {
					if (SN < "TACMITHPRATPC") {
						if (SN < "TACDMGPRATPCAP") {
							if (SN < "TACDMGPRATPA") {
								if (SN > "TACDMGPPRAT") {
									if (SN == "TACDMGPRATP") {
										return CalcStat("OutDmgPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPPRAT") {
									return CalcStat("OutDmgPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATPA") {
								if (SN > "TACDMGPRATPB") {
									if (SN == "TACDMGPRATPC") {
										return CalcStat("OutDmgPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPRATPB") {
									return CalcStat("OutDmgPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPRatPA",L);
							}
						} else if (SN > "TACDMGPRATPCAP") {
							if (SN < "TACMITHPPRAT") {
								if (SN > "TACDMGPRATPCAPR") {
									if (SN == "TACMITHPBONUS") {
										return CalcStat("MitHeavyPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPRATPCAPR") {
									return CalcStat("OutDmgPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITHPPRAT") {
								if (SN < "TACMITHPRATPA") {
									if (SN == "TACMITHPRATP") {
										return CalcStat("MitHeavyPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN > "TACMITHPRATPA") {
									if (SN == "TACMITHPRATPB") {
										return CalcStat("MitHeavyPRatPB",L);
									} else {
										return 0;
									}
								} else {
									return CalcStat("MitHeavyPRatPA",L);
								}
							} else {
								return CalcStat("MitHeavyPPRat",L,N);
							}
						} else {
							return CalcStat("OutDmgPRatPCap",L);
						}
					} else if (SN > "TACMITHPRATPC") {
						if (SN < "TACMITLPRATPA") {
							if (SN < "TACMITLPBONUS") {
								if (SN > "TACMITHPRATPCAP") {
									if (SN == "TACMITHPRATPCAPR") {
										return CalcStat("MitHeavyPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPCAP") {
									return CalcStat("MitHeavyPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPBONUS") {
								if (SN > "TACMITLPPRAT") {
									if (SN == "TACMITLPRATP") {
										return CalcStat("MitLightPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPPRAT") {
									return CalcStat("MitLightPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPBonus",L);
							}
						} else if (SN > "TACMITLPRATPA") {
							if (SN < "TACMITLPRATPCAP") {
								if (SN > "TACMITLPRATPB") {
									if (SN == "TACMITLPRATPC") {
										return CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPRATPCAP") {
								if (SN < "TACMITMPBONUS") {
									if (SN == "TACMITLPRATPCAPR") {
										return CalcStat("MitLightPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN > "TACMITMPBONUS") {
									if (SN == "TACMITMPPRAT") {
										return CalcStat("MitMediumPPRat",L,N);
									} else {
										return 0;
									}
								} else {
									return CalcStat("MitMediumPBonus",L);
								}
							} else {
								return CalcStat("MitLightPRatPCap",L);
							}
						} else {
							return CalcStat("MitLightPRatPA",L);
						}
					} else {
						return CalcStat("MitHeavyPRatPC",L);
					}
				} else if (SN > "TACMITMPRATP") {
					if (SN < "WARDENCDCALCTYPENONPHYMIT") {
						if (SN < "TPENARMOUR") {
							if (SN < "TACMITMPRATPC") {
								if (SN > "TACMITMPRATPA") {
									if (SN == "TACMITMPRATPB") {
										return CalcStat("MitMediumPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPA") {
									return CalcStat("MitMediumPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATPC") {
								if (SN > "TACMITMPRATPCAP") {
									if (SN == "TACMITMPRATPCAPR") {
										return CalcStat("MitMediumPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPCAP") {
									return CalcStat("MitMediumPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPC",L);
							}
						} else if (SN > "TPENARMOUR") {
							if (SN < "TPENRESIST") {
								if (SN > "TPENBPE") {
									if (SN == "TPENCHOICE") {
										return DataTableValue([0,1,2],L);
									} else {
										return 0;
									}
								} else if (SN == "TPENBPE") {
									return -CalcStat("BPET",L,CalcStat("TpenChoice",N));
								} else {
									return 0;
								}
							} else if (SN > "TPENRESIST") {
								if (SN < "WARDENCDARMOURTYPE") {
									if (SN == "TRAITPROG") {
										return [[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141,150],[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141,150]];
									} else {
										return 0;
									}
								} else if (SN > "WARDENCDARMOURTYPE") {
									if (SN == "WARDENCDCALCTYPECOMPHYMIT") {
										return 13;
									} else {
										return 0;
									}
								} else {
									return 2;
								}
							} else {
								return -CalcStat("ResistT",L,CalcStat("TpenChoice",N)*2);
							}
						} else {
							return -CalcStat("ArmourPenT",L,CalcStat("TpenChoice",N));
						}
					} else if (SN > "WARDENCDCALCTYPENONPHYMIT") {
						if (SN < "WARLEADERCDCALCTYPETACMIT") {
							if (SN < "WARDENCDHASPOWER") {
								if (SN > "WARDENCDCALCTYPETACMIT") {
									if (SN == "WARDENCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARDENCDCALCTYPETACMIT") {
									return 26;
								} else {
									return 0;
								}
							} else if (SN > "WARDENCDHASPOWER") {
								if (SN < "WARLEADERCDCALCTYPECOMPHYMIT") {
									if (SN == "WARLEADERCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN > "WARLEADERCDCALCTYPECOMPHYMIT") {
									if (SN == "WARLEADERCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else {
									return 14;
								}
							} else {
								return 1;
							}
						} else if (SN > "WARLEADERCDCALCTYPETACMIT") {
							if (SN < "WEAVERCDCALCTYPECOMPHYMIT") {
								if (SN > "WARLEADERCDHASPOWER") {
									if (SN == "WEAVERCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARLEADERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "WEAVERCDCALCTYPECOMPHYMIT") {
								if (SN < "WEAVERCDCALCTYPETACMIT") {
									if (SN == "WEAVERCDCALCTYPENONPHYMIT") {
										return 14;
									} else {
										return 0;
									}
								} else if (SN > "WEAVERCDCALCTYPETACMIT") {
									if (SN == "WEAVERCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else {
									return 27;
								}
							} else {
								return 13;
							}
						} else {
							return 27;
						}
					} else {
						return 13;
					}
				} else {
					return CalcStat("MitMediumPRatP",L,N);
				}
			} else {
				return CalcStat("OutDmgPBonus",L);
			}
		} else {
			return CalcStat("MitLightPPRat",L,N);
		}
	} else {
		return CalcStat("BPEPBonus",L);
	}
}

// Support functions for CalcStat. These consist of implementations of more complex calculation types, decode methods for parameter "C" and rounding/min/max/compare functions for floating point numbers.

// ****************** Calculation Type support functions ******************

// DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
// DataTableValue: Takes a value from an array table.

function DataTableValue(vDataArray, dIndex)
{
	var lIndex = RoundDbl(dIndex);
	return ((lIndex <= 1) ? vDataArray[0] : ((lIndex >= vDataArray.length) ? vDataArray[vDataArray.length-1] : vDataArray[lIndex-1]));
}

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// ExpFmod: Exponential function based on percentage.
// Common percentage values are around ~5.5% for between levels and ~20% jumps between level segments.

function ExpFmod(dVal, dLstart, dPlvl, dLvl, vDec, vAdd)
{
	var dRng = dLvl-dLstart+1;
	if (dRng <= DblCalcDev)
		return dVal;
	else {
		var dFac = 1+dPlvl/100;
		var dAdd = ((typeof vAdd === "undefined") ? 0 : vAdd);
		if (typeof vDec === "undefined") {
			var dFacExp = Math.pow(dFac,dRng);
			return dVal*dFacExp+dAdd*((dFacExp-1)/(dFac-1));
		}
		else {
			var dResult = dVal;
			var dLm = dLstart-DblCalcDev;
			while (dLm++ <= dLvl)
				dResult = RoundDbl(dResult*dFac+dAdd,vDec);
			return dResult;
		}
	}
}

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// CalcPercAB: Calculates the percentage out of a rating based on the AB formula.

function CalcPercAB(dA, dB, dPCap, dR)
{
	if (dR <= DblCalcDev)
		return 0.0;
	else {
		var dResult = dA/(1+dB/dR);
		return ((dResult >= dPCap-DblCalcDev) ? dPCap : dResult);
	}
}

// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// CalcRatAB: Calculates the rating out of a percentage based on the AB formula.

function CalcRatAB(dA, dB, dCapR, dP)
{
	if (dP <= DblCalcDev)
		return 0.0;
	else {
		var dResult = dB/(dA/dP-1);
		return ((dResult >= dCapR-DblCalcDev) ? dCapR : dResult);
	}
}

// SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// StatLinInter: (Normalized) Stat Linear Interpolating

function StatLinInter(sPntMP, sProgScheme, sProgBase, sAdj, dLvl, vNorC, vRoundType)
{
	var dN = 1;
	var sC = "";
	if (typeof vNorC !== "undefined") {
		if (typeof vNorC === "number")
			dN = vNorC;
		else if (typeof vNorC === "string")
			sC = vNorC;
	}

	// parameter processing
	var dRoundType = (typeof vRoundType === "number") ? vRoundType : 0;
	
	var dProgScheme = CalcStat(sProgScheme,dLvl);
	if (typeof dProgScheme === "undefined") return 0.0;

	// find level interval
	var dLvlMinus = dLvl-DblCalcDev;
	var iPointIndexHigh = 1;
	var iPointIndexMax = dProgScheme[0].length-1;
	while (iPointIndexHigh < iPointIndexMax) {
		if (dLvlMinus <= dProgScheme[0][iPointIndexHigh])
			break;
		iPointIndexHigh++;
	}
	var iPointIndexLow = iPointIndexHigh-1;
		
	var dAccessLvlLow = dProgScheme[0][iPointIndexLow];
	var dAccessLvlHigh = dProgScheme[0][iPointIndexHigh];
	var dBaseLvlLow = dProgScheme[1][iPointIndexLow];
	var dBaseLvlHigh = dProgScheme[1][iPointIndexHigh];
	
	// get values from base progression
	var dValLow = CalcStat(sProgBase,dBaseLvlLow,sC);
	var dValHigh = CalcStat(sProgBase,dBaseLvlHigh,sC);

	// graph point multiplications
	if (typeof sPntMP === "string" && sPntMP.trim() != "") {
		dValLow *= CalcStat(sPntMP,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sPntMP,dAccessLvlHigh,sC);
	}
	if (typeof sAdj === "string" && sAdj.trim() != "") {
		dValLow *= CalcStat(sAdj,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sAdj,dAccessLvlHigh,sC);
	}
	dValLow *= dN;
	dValHigh *= dN;

	// graph point roundings
	switch (dRoundType) {
		case 0:
			dValLow = RoundDblLotro(dValLow);
			dValHigh = RoundDblLotro(dValHigh);
			break;
		case 1:
			dValLow = (-1000.0 <= dValLow && dValLow <= 1000.0) ? RoundDblUp(dValLow,(-100.0 <= dValLow && dValLow <= 100.0) ? 2 : 1) : RoundDblLotro(dValLow);
			dValHigh = (-1000.0 <= dValHigh && dValHigh <= 1000.0) ? RoundDblUp(dValHigh,(-100.0 <= dValHigh && dValHigh <= 100.0) ? 2 : 1) : RoundDblLotro(dValHigh);
			break;
		case 2:
			dValLow = RoundDblLotro(dValLow);
			dValLow = (dValLow == -1) ? -2 : dValLow;
			dValHigh = RoundDblLotro(dValHigh);
			dValHigh = (dValHigh == -1) ? -2 : dValHigh;
			break;
	}

	// return interpolated value from the calculated graph points
	return LinFmod(1,dValLow,dValHigh,dAccessLvlLow,dAccessLvlHigh,dLvl);
}

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LinFmod: Linear line function between 2 points with some optional modifications.
// Connects point (dLstart,dVal*dFstart) with (dLend,dVal*dFend).
// Usually used with dVal=1 and dFstart/dFend containing unrelated points or dVal=# and dFstart/dFend containing multiplier factors.
// Modification for in-between points on the line: rounding.

function LinFmod(dVal, dFstart, dFend, dLstart, dLend, dLvl, vDec)
{
	if (typeof vDec === "string") {
		var sRoundType = vDec.trim().toUpperCase();
		switch (sRoundType) {
			case "P":
				return LinFmod(1,RoundDblProg(dVal*dFstart),RoundDblProg(dVal*dFend),dLstart,dLend,dLvl);
			case "L":
				return LinFmod(1,RoundDblLotro(dVal*dFstart),RoundDblLotro(dVal*dFend),dLstart,dLend,dLvl);
			default:
				return LinFmod(1,dVal*dFstart,dVal*dFend,dLstart,dLend,dLvl);
		}
	}
	if (dLstart-DblCalcDev <= dLvl && dLvl <= dLstart+DblCalcDev)
		return dVal*dFstart;
	else if (dLend-DblCalcDev <= dLvl && dLvl <= dLend+DblCalcDev)
		return dVal*dFend;
	else if (dLstart == dLend)
		return 0.0;
	else if (typeof vDec === "undefined")
		return dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart);
	else
		return RoundDbl(dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart),vDec);
}

// ****************** Parameter "C" decode support functions ******************

// ArmCodeIndex: returns a specified index from an Armour Code.
// sACode string:
// 1st position: H=heavy, M=medium, L=light
// 2nd position: H=head, S=shoulders, CL=cloak/back, C=chest, G=gloves, L=leggings, B=boots, Sh=shield
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic
// Note: no such thing exists as a heavy, medium or light cloak, so no H/M/L in cloak codes (cloaks go automatically in the M class since U23, although historically this was L)

function ArmCodeIndex(sACode, iI)
{
	var armourcode = sACode.trim().toUpperCase();

	// get positional codes and make some corrections
	var sArmCat = armourcode.substr(0,1);
	var sArmType = armourcode.substr(1,1);
	var sArmCol = armourcode.substr(2,1);
	if (sArmType == "S" && sArmCol == "H") {
		sArmType = "SH";
		sArmCol = armourcode.substr(3,1);
	} else if (sArmCat == "C" && sArmType == "L") {
		sArmCat = "M";
		sArmType = "CL";
	} else
		sArmType = " "+sArmType;
	
	switch (iI) {
		case 1:
			var ind = "HML".indexOf(sArmCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = " H SCL C G L BSH".indexOf(sArmType);
			return ((ind == -1) ? 0 : (ind/2)+1);
		case 3:
			var ind = "WYPTG".indexOf(sArmCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// QualityCodeIndex: returns a quality index from a Quality Code.
// sQCode string: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function QualityCodeIndex(sQCode)
{
	var ind = "WYPTG".indexOf(sQCode.trim().substr(0,1).toUpperCase());
	return ((ind == -1) ? 0 : ind+1);
}

// WpnCodeIndex: returns a specified index from a Weapon Code.
// sWCode string:
// 1st position: H=heavy, L=light
// 2nd position: O=one-handed, T=two-handed, B=bow
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function WpnCodeIndex(sWCode, iI)
{
	var weaponcode = sWCode.trim().toUpperCase();
	var sWpnCat = weaponcode.substr(0,1);
	var sWpnType = weaponcode.substr(1,1);
	var sWpnCol = weaponcode.substr(2,1);
	
	switch (iI) {
		case 1:
			var ind = "HL".indexOf(sWpnCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = "OTB".indexOf(sWpnType);
			return ((ind == -1) ? 0 : ind+1);
		case 3:
			var ind = "WYPTG".indexOf(sWpnCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// RomanRankDecode: converts a string with a Roman number in characters, to an integer number.
// used for Legendary Item Title calculation.

var RomanRankChars = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
var RomanRankValues = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function RomanRankDecode(sNumber)
{
	if (typeof sNumber === "string") {
		var sn = sNumber.trim().toUpperCase();
		if (sn.length > 0)
			for (var ind = 0, len = RomanRankChars.length; ind < len; ind++)
				if (sn.indexOf(RomanRankChars[ind]) == 0)
					return RomanRankValues[ind]+RomanRankDecode(sn.slice(RomanRankChars[ind].length));
	}
	return 0;
}

// ReverseCalc: tries to calculate back a calculation result to the original (integer) level.
// Does not support N.

function ReverseCalc(sStat, dNum)
{
	if (sStat.trim().length > 0) {
		var dNumMinus = dNum-DblCalcDev;
		var dNumPlus = dNum+DblCalcDev;
		var minlvl = 1;
		var maxlvl = 549;
		var devlvl = 3;
	
		var left = minlvl-1;
		var right = maxlvl;
		var middle = 0;
		
		var count = minlvl;

		while (right > left+1 && count++ <= maxlvl) {
			middle = Math.trunc((left+right)/2);
			if (CalcStat(sStat,middle) >= dNumMinus)
				right = middle;
			else
				left = middle;
		}

		var mintest = Math.max(right-devlvl,minlvl);
		var maxtest = Math.min(right+devlvl,maxlvl);

		var dFound = 0;
	
		// we check nearby in case the progression is not completely ascending/sorted.
		for (var test = mintest; test <= maxtest; test++) {
			dFound = CalcStat(sStat,test);
			if  (dNumMinus <= dFound && dFound <= dNumPlus)
				return test;
		}
	}

	return 0;
}

// ****************** Misc. floating point support functions ******************

// Misc. functions for floating point: rounding etc.
// For roundings: vDec is number of decimals.

function RoundDbl(dNum, vDec)
{
	var dCorrection = 0.5+DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblDown(dNum, vDec)
{
	var dCorrection = DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblUp(dNum, vDec)
{
	var dCorrection = 1-DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	if (typeof vDec === "undefined" || (-DblCalcDev <= vDec && vDec <= DblCalcDev))
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,vDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}

function RoundDblLotro(dNum)
{
	var dCorrection = 1-DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;

	var iNumCeiled = Math.trunc(iSign*dNum+dCorrection);
	if (iNumCeiled <= 1000)
		return iSign*iNumCeiled;

	var iFactor = 1;
	var iTestNum = Math.trunc(iNumCeiled/1000);
	while (iTestNum > 0) {
		iTestNum = Math.trunc(iTestNum/10);
		iFactor *= 10;
	}

	return iSign*Math.trunc(iNumCeiled/iFactor+dCorrection)*iFactor;
}

function RoundDblProg(dNum)
{
	var dCorrection = 0.5+DblCalcDev;
	var iSign = (dNum < 0) ? -1 : 1;
	
	var dTestNum = dNum/(0.5*(iSign*63));
	var dDec = -Math.floor(Math.log10(dTestNum));

	if (-DblCalcDev <= dDec && dDec <= DblCalcDev)
		return iSign*Math.trunc(iSign*dNum+dCorrection);
	else {
		var dFactor = Math.pow(10,dDec);
		return iSign*Math.trunc(iSign*dNum*dFactor+dCorrection)/dFactor;
	}
}
