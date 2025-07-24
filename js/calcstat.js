// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
const DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	const SN = SName.trim().toUpperCase();
	const L = SLvl;
	const Lm = L-DblCalcDev;
	const Lp = L+DblCalcDev;
	let N = 1.0;
	let C = "";
	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number")
			N = SParam;
		else if (typeof SParam === "string")
			C = SParam;
	}

	let Result = 0.0;

	if (SN < "MARINERCDBASEWILL") {
		if (SN < "CRITHITPRATP") {
			if (SN < "BURGLARCDARMOURTYPE") {
				if (SN < "BLOCKPBONUS") {
					if (SN < "BEORNINGCDBASEICMR") {
						if (SN < "BASEMAIN") {
							if (SN < "ALIGNMENTNAME") {
								if (SN < "ADJTRAIT") {
									if (SN == "-VERSION") {
										Result = "2.4.15p";
									}
								} else if (SN > "ADJTRAIT") {
									if (SN > "ADJTRAITMIT") {
										if (SN == "AGILITYT") {
											Result = CalcStat("MainT",L,N);
										}
									} else if (SN == "ADJTRAITMIT") {
										if (141 <= Lp && Lm <= 141) {
											Result = 0.78;
										} else if (150 <= Lp && Lm <= 160) {
											Result = 0.7;
										} else {
											Result = 1;
										}
									}
								} else {
									if (141 <= Lp && Lm <= 150) {
										Result = 0.9;
									} else {
										Result = 1;
									}
								}
							} else if (SN > "ALIGNMENTNAME") {
								if (SN < "AWARDILVLI") {
									if (SN == "ARMOURPENT") {
										Result = EquSng(StatLinInter("PntMPArmourPenT","TraitPntS","ProgBArmour","",L,N,1));
									}
								} else if (SN > "AWARDILVLI") {
									if (SN > "BASEAGILITY") {
										if (SN == "BASEFATE") {
											if (Lm <= 95) {
												Result = RoundDbl(CalcStat("ProgBFate",L)*7.0);
											} else {
												Result = RoundDbl(RoundDbl(CalcStat("ProgBFate",L),1)*7.0);
											}
										}
									} else if (SN == "BASEAGILITY") {
										Result = CalcStat("BaseMain",L,N);
									}
								} else {
									if (Lm <= 44) {
										Result = 1;
									} else if (Lm <= 55) {
										Result = 52;
									} else if (Lm <= 75) {
										Result = RoundDblDown((L-56)/5)*5+60;
									} else if (Lm <= 85) {
										Result = RoundDblDown((L-76)/5)*29+100;
									} else if (Lm <= 95) {
										Result = RoundDblDown((L-86)/5)*20+155;
									} else if (Lm <= 100) {
										Result = RoundDblDown((L-96)/4)*10+190;
									} else if (Lm <= 105) {
										Result = RoundDblDown((L-101)/4)*35+215;
									} else if (Lm <= 110) {
										Result = CalcStat("LvlToILvl",106)+15;
									} else if (Lm <= 115) {
										Result = CalcStat("LvlToILvl",115);
									} else if (Lm <= 119) {
										Result = CalcStat("LvlToILvl",116)+15;
									} else if (Lm <= 120) {
										Result = CalcStat("LvlToILvl",120);
									} else if (Lm <= 125) {
										Result = CalcStat("LvlToILvl",121)+15;
									} else if (Lm <= 130) {
										Result = CalcStat("LvlToILvl",130);
									} else if (Lm <= 135) {
										Result = CalcStat("LvlToILvl",131)+15;
									} else if (Lm <= 140) {
										Result = CalcStat("LvlToILvl",140);
									} else if (Lm <= 145) {
										Result = CalcStat("LvlToILvl",141)+15;
									} else if (Lm <= 150) {
										Result = CalcStat("LvlToILvl",150);
									} else {
										Result = CalcStat("AwardILvlI",150);
									}
								}
							} else {
								if (1 <= Lp && Lm <= 1) {
									Result = "Good";
								} else if (2 <= Lp && Lm <= 2) {
									Result = "Neutral";
								} else if (3 <= Lp && Lm <= 3) {
									Result = "Evil";
								} else {
									Result = "";
								}
							}
						} else if (SN > "BASEMAIN") {
							if (SN < "BASEWILL") {
								if (SN < "BASEMORALE") {
									if (SN == "BASEMIGHT") {
										Result = CalcStat("BaseMain",L,N);
									}
								} else if (SN > "BASEMORALE") {
									if (SN > "BASEPOWER") {
										if (SN == "BASEVITALITY") {
											if (Lm <= 95) {
												Result = RoundDbl(CalcStat("ProgBVitality",L)*1.5);
											} else {
												Result = RoundDbl(RoundDbl(CalcStat("ProgBVitality",L))*1.5);
											}
										}
									} else if (SN == "BASEPOWER") {
										if (Lm <= 95) {
											Result = RoundDblDown(CalcStat("ProgBPower",L)*10);
										} else {
											Result = RoundDbl(CalcStat("ProgBPower",L)*10);
										}
									}
								} else {
									if (Lm <= 95) {
										Result = RoundDblDown(CalcStat("ProgBMorale",L)*10);
									} else {
										Result = RoundDbl(RoundDbl(CalcStat("ProgBMorale",L))*10);
									}
								}
							} else if (SN > "BASEWILL") {
								if (SN < "BEORNINGCDARMOURTYPE") {
									if (SN > "BEOFEWINNUMBERFATE") {
										if (SN == "BEOMIGHTOFTHEWILDMIGHT") {
											Result = CalcStat("MightT",L,1.0);
										}
									} else if (SN == "BEOFEWINNUMBERFATE") {
										Result = -CalcStat("FateT",L,0.4);
									}
								} else if (SN > "BEORNINGCDARMOURTYPE") {
									if (SN > "BEORNINGCDBASEAGILITY") {
										if (SN == "BEORNINGCDBASEFATE") {
											Result = CalcStat("ClassBaseFate",L);
										}
									} else if (SN == "BEORNINGCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityM",L);
									}
								} else {
									Result = 3;
								}
							} else {
								Result = CalcStat("BaseMain",L,N);
							}
						} else {
							if (Lm <= 95) {
								Result = RoundDbl(CalcStat("ProgBMainBase",L)*N);
							} else {
								Result = RoundDbl(RoundDbl(CalcStat("ProgBMainBase",L))*N);
							}
						}
					} else if (SN > "BEORNINGCDBASEICMR") {
						if (SN < "BEORNINGCDCALCTYPETACMIT") {
							if (SN < "BEORNINGCDBASENCPR") {
								if (SN < "BEORNINGCDBASEMIGHT") {
									if (SN == "BEORNINGCDBASEICPR") {
										Result = CalcStat("ClassBaseICPR",L);
									}
								} else if (SN > "BEORNINGCDBASEMIGHT") {
									if (SN > "BEORNINGCDBASEMORALE") {
										if (SN == "BEORNINGCDBASENCMR") {
											Result = CalcStat("ClassBaseNCMRM",L);
										}
									} else if (SN == "BEORNINGCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else {
									Result = CalcStat("ClassBaseMightM",L);
								}
							} else if (SN > "BEORNINGCDBASENCPR") {
								if (SN < "BEORNINGCDBASEWILL") {
									if (SN > "BEORNINGCDBASEPOWER") {
										if (SN == "BEORNINGCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "BEORNINGCDBASEPOWER") {
										Result = 10;
									}
								} else if (SN > "BEORNINGCDBASEWILL") {
									if (SN > "BEORNINGCDCALCTYPECOMPHYMIT") {
										if (SN == "BEORNINGCDCALCTYPENONPHYMIT") {
											Result = 14;
										}
									} else if (SN == "BEORNINGCDCALCTYPECOMPHYMIT") {
										Result = 14;
									}
								} else {
									Result = CalcStat("ClassBaseWillM",L);
								}
							} else {
								Result = CalcStat("ClassBaseNCPR",L);
							}
						} else if (SN > "BEORNINGCDCALCTYPETACMIT") {
							if (SN < "BEOTHICKHIDEVITALITY") {
								if (SN < "BEORNINGRDTRAITFATE") {
									if (SN == "BEORNINGCDCANBLOCK") {
										if (6 <= Lp) {
											Result = 1;
										}
									}
								} else if (SN > "BEORNINGRDTRAITFATE") {
									if (SN > "BEORNINGRDTRAITMIGHT") {
										if (SN == "BEORNINGRDTRAITVITALITY") {
											Result = CalcStat("BeoThickHideVitality",L);
										}
									} else if (SN == "BEORNINGRDTRAITMIGHT") {
										Result = CalcStat("BeoMightoftheWildMight",L);
									}
								} else {
									Result = CalcStat("BeoFewinNumberFate",L);
								}
							} else if (SN > "BEOTHICKHIDEVITALITY") {
								if (SN < "BLACKARROWCDCALCTYPENONPHYMIT") {
									if (SN > "BLACKARROWCANBLOCK") {
										if (SN == "BLACKARROWCDCALCTYPECOMPHYMIT") {
											Result = 13;
										}
									} else if (SN == "BLACKARROWCANBLOCK") {
										Result = 1;
									}
								} else if (SN > "BLACKARROWCDCALCTYPENONPHYMIT") {
									if (SN > "BLACKARROWCDCALCTYPETACMIT") {
										if (SN == "BLACKARROWCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "BLACKARROWCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else {
								Result = CalcStat("VitalityT",L,1.0);
							}
						} else {
							Result = 27;
						}
					} else {
						Result = CalcStat("ClassBaseICMRM",L);
					}
				} else if (SN > "BLOCKPBONUS") {
					if (SN < "BRATMITMEDIUM") {
						if (SN < "BPEPRATPB") {
							if (SN < "BLOCKPRATPC") {
								if (SN < "BLOCKPRATP") {
									if (SN == "BLOCKPPRAT") {
										Result = CalcStat("BPEPPRat",L,N);
									}
								} else if (SN > "BLOCKPRATP") {
									if (SN > "BLOCKPRATPA") {
										if (SN == "BLOCKPRATPB") {
											Result = CalcStat("BPEPRatPB",L);
										}
									} else if (SN == "BLOCKPRATPA") {
										Result = CalcStat("BPEPRatPA",L);
									}
								} else {
									Result = CalcStat("BPEPRatP",L,N);
								}
							} else if (SN > "BLOCKPRATPC") {
								if (SN < "BPEPPRAT") {
									if (SN > "BLOCKPRATPCAP") {
										if (SN == "BLOCKPRATPCAPR") {
											Result = CalcStat("BPEPRatPCapR",L);
										}
									} else if (SN == "BLOCKPRATPCAP") {
										Result = CalcStat("BPEPRatPCap",L);
									}
								} else if (SN > "BPEPPRAT") {
									if (SN > "BPEPRATP") {
										if (SN == "BPEPRATPA") {
											Result = 39;
										}
									} else if (SN == "BPEPRATP") {
										Result = CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
									}
								} else {
									Result = CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
								}
							} else {
								Result = CalcStat("BPEPRatPC",L);
							}
						} else if (SN > "BPEPRATPB") {
							if (SN < "BRATCRITMAGN") {
								if (SN < "BPEPRATPCAP") {
									if (SN == "BPEPRATPC") {
										Result = 0.5;
									}
								} else if (SN > "BPEPRATPCAP") {
									if (SN > "BPEPRATPCAPR") {
										if (SN == "BPET") {
											Result = EquSng(StatLinInter("PntMPBPE","TraitPntS","ProgBBPE","AdjTrait",L,N,1));
										}
									} else if (SN == "BPEPRATPCAPR") {
										Result = CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
									}
								} else {
									Result = 13;
								}
							} else if (SN > "BRATCRITMAGN") {
								if (SN < "BRATMITHEAVY") {
									if (SN > "BRATDEVHIT") {
										if (SN == "BRATEXTRA") {
											Result = CalcStat("StdProgRatings",L,300);
										}
									} else if (SN == "BRATDEVHIT") {
										Result = CalcStat("StdProgRatings",L,400);
									}
								} else if (SN > "BRATMITHEAVY") {
									if (SN > "BRATMITIGATIONS") {
										if (SN == "BRATMITLIGHT") {
											Result = CalcStat("BRatMitigations",L,0.666);
										}
									} else if (SN == "BRATMITIGATIONS") {
										if (Lm <= 50) {
											Result = LinFmod(1,(N*CalcStat("BRatStandard",1))*7/6-50.4,N*CalcStat("BRatStandard",50),1,50,L,"P");
										} else {
											Result = StatLinInter("","StdPntS","BRatStandard","",L,N,4);
										}
									}
								} else {
									Result = CalcStat("BRatStandard",L);
								}
							} else {
								Result = CalcStat("StdProgRatings",L,600);
							}
						} else {
							Result = CalcStat("BRatRounded",L,"BRatStandard");
						}
					} else if (SN > "BRATMITMEDIUM") {
						if (SN < "BRAWLERCDBASEMIGHT") {
							if (SN < "BRATSTANDARD") {
								if (SN < "BRATPARTBPE") {
									if (SN == "BRATOUTHEAL") {
										Result = CalcStat("StdProgRatings",L,450);
									}
								} else if (SN > "BRATPARTBPE") {
									if (SN > "BRATPROGB") {
										if (SN == "BRATROUNDED") {
											if (Lm <= 50) {
												Result = RoundDbl(CalcStat(C,L));
											} else if (Lm <= 105) {
												Result = RoundDbl(CalcStat(C,L),-1);
											} else if (Lm <= 115) {
												Result = RoundDbl(CalcStat(C,L),-2);
											} else if (Lm <= 130) {
												Result = RoundDbl(CalcStat(C,L),-1);
											} else if (Lm <= 150) {
												Result = RoundDbl(CalcStat(C,L),-2);
											} else {
												Result = RoundDbl(CalcStat(C,L));
											}
										}
									} else if (SN == "BRATPROGB") {
										if (Lm <= 50) {
											Result = RoundDbl(CalcStat(C,L));
										} else {
											Result = CalcStat(C,L);
										}
									}
								} else {
									Result = CalcStat("StdProgRatings",L,350);
								}
							} else if (SN > "BRATSTANDARD") {
								if (SN < "BRAWLERCDBASEFATE") {
									if (SN > "BRAWLERCDARMOURTYPE") {
										if (SN == "BRAWLERCDBASEAGILITY") {
											Result = CalcStat("ClassBaseAgilityM",L);
										}
									} else if (SN == "BRAWLERCDARMOURTYPE") {
										Result = 3;
									}
								} else if (SN > "BRAWLERCDBASEFATE") {
									if (SN > "BRAWLERCDBASEICMR") {
										if (SN == "BRAWLERCDBASEICPR") {
											Result = CalcStat("ClassBaseICPR",L);
										}
									} else if (SN == "BRAWLERCDBASEICMR") {
										Result = CalcStat("ClassBaseICMRL",L);
									}
								} else {
									Result = CalcStat("ClassBaseFate",L);
								}
							} else {
								Result = CalcStat("StdProgRatings",L,200);
							}
						} else if (SN > "BRAWLERCDBASEMIGHT") {
							if (SN < "BRAWLERCDBASEVITALITY") {
								if (SN < "BRAWLERCDBASENCMR") {
									if (SN == "BRAWLERCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else if (SN > "BRAWLERCDBASENCMR") {
									if (SN > "BRAWLERCDBASENCPR") {
										if (SN == "BRAWLERCDBASEPOWER") {
											Result = CalcStat("ClassBasePower",L);
										}
									} else if (SN == "BRAWLERCDBASENCPR") {
										Result = CalcStat("ClassBaseNCPR",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCMRL",L);
								}
							} else if (SN > "BRAWLERCDBASEVITALITY") {
								if (SN < "BRAWLERCDCALCTYPENONPHYMIT") {
									if (SN > "BRAWLERCDBASEWILL") {
										if (SN == "BRAWLERCDCALCTYPECOMPHYMIT") {
											Result = 14;
										}
									} else if (SN == "BRAWLERCDBASEWILL") {
										Result = CalcStat("ClassBaseWillL",L);
									}
								} else if (SN > "BRAWLERCDCALCTYPENONPHYMIT") {
									if (SN > "BRAWLERCDCALCTYPETACMIT") {
										if (SN == "BRAWLERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "BRAWLERCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else {
								Result = CalcStat("ClassBaseVitality",L);
							}
						} else {
							Result = CalcStat("ClassBaseMightH",L);
						}
					} else {
						Result = CalcStat("BRatMitigations",L,0.833);
					}
				} else {
					Result = CalcStat("BPEPBonus",L);
				}
			} else if (SN > "BURGLARCDARMOURTYPE") {
				if (SN < "CHAMPIONCDBASEWILL") {
					if (SN < "CAPTAINCDBASEMORALE") {
						if (SN < "BURGLARCDBASEWILL") {
							if (SN < "BURGLARCDBASEMIGHT") {
								if (SN < "BURGLARCDBASEFATE") {
									if (SN == "BURGLARCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityH",L);
									}
								} else if (SN > "BURGLARCDBASEFATE") {
									if (SN > "BURGLARCDBASEICMR") {
										if (SN == "BURGLARCDBASEICPR") {
											Result = CalcStat("ClassBaseICPR",L);
										}
									} else if (SN == "BURGLARCDBASEICMR") {
										Result = CalcStat("ClassBaseICMRL",L);
									}
								} else {
									Result = CalcStat("ClassBaseFate",L);
								}
							} else if (SN > "BURGLARCDBASEMIGHT") {
								if (SN < "BURGLARCDBASENCPR") {
									if (SN > "BURGLARCDBASEMORALE") {
										if (SN == "BURGLARCDBASENCMR") {
											Result = CalcStat("ClassBaseNCMRL",L);
										}
									} else if (SN == "BURGLARCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else if (SN > "BURGLARCDBASENCPR") {
									if (SN > "BURGLARCDBASEPOWER") {
										if (SN == "BURGLARCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "BURGLARCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else {
								Result = CalcStat("ClassBaseMightM",L);
							}
						} else if (SN > "BURGLARCDBASEWILL") {
							if (SN < "CAPTAINCDARMOURTYPE") {
								if (SN < "BURGLARCDCALCTYPENONPHYMIT") {
									if (SN == "BURGLARCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else if (SN > "BURGLARCDCALCTYPENONPHYMIT") {
									if (SN > "BURGLARCDCALCTYPETACMIT") {
										if (SN == "BURGLARCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "BURGLARCDCALCTYPETACMIT") {
										Result = 26;
									}
								} else {
									Result = 13;
								}
							} else if (SN > "CAPTAINCDARMOURTYPE") {
								if (SN < "CAPTAINCDBASEICMR") {
									if (SN > "CAPTAINCDBASEAGILITY") {
										if (SN == "CAPTAINCDBASEFATE") {
											Result = CalcStat("ClassBaseFate",L);
										}
									} else if (SN == "CAPTAINCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityL",L);
									}
								} else if (SN > "CAPTAINCDBASEICMR") {
									if (SN > "CAPTAINCDBASEICPR") {
										if (SN == "CAPTAINCDBASEMIGHT") {
											Result = CalcStat("ClassBaseMightH",L);
										}
									} else if (SN == "CAPTAINCDBASEICPR") {
										Result = CalcStat("ClassBaseICPR",L);
									}
								} else {
									Result = CalcStat("ClassBaseICMRM",L);
								}
							} else {
								Result = 3;
							}
						} else {
							Result = CalcStat("ClassBaseWillL",L);
						}
					} else if (SN > "CAPTAINCDBASEMORALE") {
						if (SN < "CHAMPIONCDARMOURTYPE") {
							if (SN < "CAPTAINCDBASEWILL") {
								if (SN < "CAPTAINCDBASENCPR") {
									if (SN == "CAPTAINCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRM",L);
									}
								} else if (SN > "CAPTAINCDBASENCPR") {
									if (SN > "CAPTAINCDBASEPOWER") {
										if (SN == "CAPTAINCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "CAPTAINCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else if (SN > "CAPTAINCDBASEWILL") {
								if (SN < "CAPTAINCDCALCTYPETACMIT") {
									if (SN > "CAPTAINCDCALCTYPECOMPHYMIT") {
										if (SN == "CAPTAINCDCALCTYPENONPHYMIT") {
											Result = 14;
										}
									} else if (SN == "CAPTAINCDCALCTYPECOMPHYMIT") {
										Result = 14;
									}
								} else if (SN > "CAPTAINCDCALCTYPETACMIT") {
									if (SN > "CAPTAINCDCANBLOCK") {
										if (SN == "CAPTAINCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "CAPTAINCDCANBLOCK") {
										if (15 <= Lp) {
											Result = 1;
										}
									}
								} else {
									Result = 27;
								}
							} else {
								Result = CalcStat("ClassBaseWillM",L);
							}
						} else if (SN > "CHAMPIONCDARMOURTYPE") {
							if (SN < "CHAMPIONCDBASEMIGHT") {
								if (SN < "CHAMPIONCDBASEFATE") {
									if (SN == "CHAMPIONCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityM",L);
									}
								} else if (SN > "CHAMPIONCDBASEFATE") {
									if (SN > "CHAMPIONCDBASEICMR") {
										if (SN == "CHAMPIONCDBASEICPR") {
											Result = CalcStat("ClassBaseICPR",L);
										}
									} else if (SN == "CHAMPIONCDBASEICMR") {
										Result = CalcStat("ClassBaseICMRH",L);
									}
								} else {
									Result = CalcStat("ClassBaseFate",L);
								}
							} else if (SN > "CHAMPIONCDBASEMIGHT") {
								if (SN < "CHAMPIONCDBASENCPR") {
									if (SN > "CHAMPIONCDBASEMORALE") {
										if (SN == "CHAMPIONCDBASENCMR") {
											Result = CalcStat("ClassBaseNCMRH",L);
										}
									} else if (SN == "CHAMPIONCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else if (SN > "CHAMPIONCDBASENCPR") {
									if (SN > "CHAMPIONCDBASEPOWER") {
										if (SN == "CHAMPIONCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "CHAMPIONCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else {
								Result = CalcStat("ClassBaseMightH",L);
							}
						} else {
							Result = 3;
						}
					} else {
						Result = CalcStat("ClassBaseMorale",L);
					}
				} else if (SN > "CHAMPIONCDBASEWILL") {
					if (SN < "CLASSBASEMIGHTM") {
						if (SN < "CLASSBASEAGILITYH") {
							if (SN < "CHAMPIONCDHASPOWER") {
								if (SN < "CHAMPIONCDCALCTYPENONPHYMIT") {
									if (SN == "CHAMPIONCDCALCTYPECOMPHYMIT") {
										Result = 14;
									}
								} else if (SN > "CHAMPIONCDCALCTYPENONPHYMIT") {
									if (SN > "CHAMPIONCDCALCTYPETACMIT") {
										if (SN == "CHAMPIONCDCANBLOCK") {
											if (6 <= Lp) {
												Result = 1;
											}
										}
									} else if (SN == "CHAMPIONCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else if (SN > "CHAMPIONCDHASPOWER") {
								if (SN < "CHICKENCDCALCTYPENONPHYMIT") {
									if (SN > "CHICKENCANBLOCK") {
										if (SN == "CHICKENCDCALCTYPECOMPHYMIT") {
											Result = 14;
										}
									} else if (SN == "CHICKENCANBLOCK") {
										Result = 1;
									}
								} else if (SN > "CHICKENCDCALCTYPENONPHYMIT") {
									if (SN > "CHICKENCDCALCTYPETACMIT") {
										if (SN == "CHICKENCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "CHICKENCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else {
								Result = 1;
							}
						} else if (SN > "CLASSBASEAGILITYH") {
							if (SN < "CLASSBASEICMRL") {
								if (SN < "CLASSBASEAGILITYM") {
									if (SN == "CLASSBASEAGILITYL") {
										Result = CalcStat("BaseAgility",L,0.5);
									}
								} else if (SN > "CLASSBASEAGILITYM") {
									if (SN > "CLASSBASEFATE") {
										if (SN == "CLASSBASEICMRH") {
											Result = EquSng(0.2);
										}
									} else if (SN == "CLASSBASEFATE") {
										Result = CalcStat("BaseFate",L);
									}
								} else {
									Result = CalcStat("BaseAgility",L,1.0);
								}
							} else if (SN > "CLASSBASEICMRL") {
								if (SN < "CLASSBASEICPRADJ") {
									if (SN > "CLASSBASEICMRM") {
										if (SN == "CLASSBASEICPR") {
											Result = EquSng(StatLinInter("PntMPClassBaseICPR","ClassBasePowerRegenPntS","ProgBICPR","ClassBaseICPRAdj",L,N,0));
										}
									} else if (SN == "CLASSBASEICMRM") {
										Result = EquSng(0.175);
									}
								} else if (SN > "CLASSBASEICPRADJ") {
									if (SN > "CLASSBASEMIGHTH") {
										if (SN == "CLASSBASEMIGHTL") {
											Result = CalcStat("BaseMight",L,0.5);
										}
									} else if (SN == "CLASSBASEMIGHTH") {
										Result = CalcStat("BaseMight",L,1.5);
									}
								} else {
									if (Lm <= 1) {
										Result = 1.5;
									} else if (Lm <= 20) {
										Result = 1.1;
									} else {
										Result = 1;
									}
								}
							} else {
								Result = EquSng(0.15);
							}
						} else {
							Result = CalcStat("BaseAgility",L,1.5);
						}
					} else if (SN > "CLASSBASEMIGHTM") {
						if (SN < "CLASSBASEWILLL") {
							if (SN < "CLASSBASENCPR") {
								if (SN < "CLASSBASENCMRH") {
									if (SN == "CLASSBASEMORALE") {
										Result = CalcStat("BaseMorale",L);
									}
								} else if (SN > "CLASSBASENCMRH") {
									if (SN > "CLASSBASENCMRL") {
										if (SN == "CLASSBASENCMRM") {
											Result = 1;
										}
									} else if (SN == "CLASSBASENCMRL") {
										Result = 1;
									}
								} else {
									Result = 2;
								}
							} else if (SN > "CLASSBASENCPR") {
								if (SN < "CLASSBASEPOWERREGENPNTS") {
									if (SN > "CLASSBASENCPRADJ") {
										if (SN == "CLASSBASEPOWER") {
											Result = CalcStat("BasePower",L);
										}
									} else if (SN == "CLASSBASENCPRADJ") {
										if (Lm <= 1) {
											Result = 1.5;
										} else if (Lm <= 20) {
											Result = 1.1;
										} else {
											Result = 1;
										}
									}
								} else if (SN > "CLASSBASEPOWERREGENPNTS") {
									if (SN > "CLASSBASEVITALITY") {
										if (SN == "CLASSBASEWILLH") {
											Result = CalcStat("BaseWill",L,1.5);
										}
									} else if (SN == "CLASSBASEVITALITY") {
										Result = CalcStat("BaseVitality",L);
									}
								} else {
									Result = [[1,20,50,60,65,75,85,95,100,105,115,120,130,140,141,150],[1,20,50,60,65,75,85,95,100,105,115,120,130,140,141,150]];
								}
							} else {
								Result = EquSng(StatLinInter("PntMPClassBaseNCPR","ClassBasePowerRegenPntS","ProgBNCPR","ClassBaseNCPRAdj",L,N,0));
							}
						} else if (SN > "CLASSBASEWILLL") {
							if (SN < "CRITDEFPRATPA") {
								if (SN < "CLASSNAME") {
									if (SN == "CLASSBASEWILLM") {
										Result = CalcStat("BaseWill",L,1.0);
									}
								} else if (SN > "CLASSNAME") {
									if (SN > "CRITDEFPPRAT") {
										if (SN == "CRITDEFPRATP") {
											Result = CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
										}
									} else if (SN == "CRITDEFPPRAT") {
										Result = CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
									}
								} else {
									if (23 <= Lp && Lm <= 23) {
										Result = "Guardian";
									} else if (24 <= Lp && Lm <= 24) {
										Result = "Captain";
									} else if (31 <= Lp && Lm <= 31) {
										Result = "Minstrel";
									} else if (40 <= Lp && Lm <= 40) {
										Result = "Burglar";
									} else if (52 <= Lp && Lm <= 52) {
										Result = "Warleader";
									} else if (71 <= Lp && Lm <= 71) {
										Result = "Reaver";
									} else if (126 <= Lp && Lm <= 126) {
										Result = "Stalker";
									} else if (127 <= Lp && Lm <= 127) {
										Result = "Weaver";
									} else if (128 <= Lp && Lm <= 128) {
										Result = "Defiler";
									} else if (162 <= Lp && Lm <= 162) {
										Result = "Hunter";
									} else if (172 <= Lp && Lm <= 172) {
										Result = "Champion";
									} else if (179 <= Lp && Lm <= 179) {
										Result = "Blackarrow";
									} else if (185 <= Lp && Lm <= 185) {
										Result = "LoreMaster";
									} else if (192 <= Lp && Lm <= 192) {
										Result = "Chicken";
									} else if (193 <= Lp && Lm <= 193) {
										Result = "RuneKeeper";
									} else if (194 <= Lp && Lm <= 194) {
										Result = "Warden";
									} else if (214 <= Lp && Lm <= 214) {
										Result = "Beorning";
									} else if (215 <= Lp && Lm <= 215) {
										Result = "Brawler";
									} else if (216 <= Lp && Lm <= 216) {
										Result = "Mariner";
									} else if (217 <= Lp && Lm <= 217) {
										Result = "Sorceress";
									} else {
										Result = "";
									}
								}
							} else if (SN > "CRITDEFPRATPA") {
								if (SN < "CRITDEFPRATPCAP") {
									if (SN > "CRITDEFPRATPB") {
										if (SN == "CRITDEFPRATPC") {
											Result = 0.5;
										}
									} else if (SN == "CRITDEFPRATPB") {
										Result = CalcStat("BRatRounded",L,"BRatStandard");
									}
								} else if (SN > "CRITDEFPRATPCAP") {
									if (SN > "CRITDEFPRATPCAPR") {
										if (SN == "CRITHITPPRAT") {
											Result = CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
										}
									} else if (SN == "CRITDEFPRATPCAPR") {
										Result = CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
									}
								} else {
									Result = 80;
								}
							} else {
								Result = 240;
							}
						} else {
							Result = CalcStat("BaseWill",L,0.5);
						}
					} else {
						Result = CalcStat("BaseMight",L,1.0);
					}
				} else {
					Result = CalcStat("ClassBaseWillL",L);
				}
			} else {
				Result = 2;
			}
		} else if (SN > "CRITHITPRATP") {
			if (SN < "HELFSORROWUNDYINGWILL") {
				if (SN < "ELFAGILITYWOODSAGILITY") {
					if (SN < "DEVHITPRATPB") {
						if (SN < "CRITMAGNPRATPC") {
							if (SN < "CRITHITPRATPCAPR") {
								if (SN < "CRITHITPRATPB") {
									if (SN == "CRITHITPRATPA") {
										Result = 75;
									}
								} else if (SN > "CRITHITPRATPB") {
									if (SN > "CRITHITPRATPC") {
										if (SN == "CRITHITPRATPCAP") {
											Result = 25;
										}
									} else if (SN == "CRITHITPRATPC") {
										Result = 0.5;
									}
								} else {
									Result = CalcStat("BRatRounded",L,"BRatExtra");
								}
							} else if (SN > "CRITHITPRATPCAPR") {
								if (SN < "CRITMAGNPRATP") {
									if (SN == "CRITMAGNPPRAT") {
										Result = CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
									}
								} else if (SN > "CRITMAGNPRATP") {
									if (SN > "CRITMAGNPRATPA") {
										if (SN == "CRITMAGNPRATPB") {
											Result = CalcStat("BRatRounded",L,"BRatCritMagn");
										}
									} else if (SN == "CRITMAGNPRATPA") {
										Result = 225;
									}
								} else {
									Result = CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
								}
							} else {
								Result = CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
							}
						} else if (SN > "CRITMAGNPRATPC") {
							if (SN < "DEFILERCDCALCTYPENONPHYMIT") {
								if (SN < "CRITMAGNPRATPCAPR") {
									if (SN == "CRITMAGNPRATPCAP") {
										Result = 75;
									}
								} else if (SN > "CRITMAGNPRATPCAPR") {
									if (SN > "DEFILERCANBLOCK") {
										if (SN == "DEFILERCDCALCTYPECOMPHYMIT") {
											Result = 13;
										}
									} else if (SN == "DEFILERCANBLOCK") {
										Result = 1;
									}
								} else {
									Result = CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
								}
							} else if (SN > "DEFILERCDCALCTYPENONPHYMIT") {
								if (SN < "DEVHITPPRAT") {
									if (SN > "DEFILERCDCALCTYPETACMIT") {
										if (SN == "DEFILERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "DEFILERCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else if (SN > "DEVHITPPRAT") {
									if (SN > "DEVHITPRATP") {
										if (SN == "DEVHITPRATPA") {
											Result = 30;
										}
									} else if (SN == "DEVHITPRATP") {
										Result = CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
									}
								} else {
									Result = CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
								}
							} else {
								Result = 14;
							}
						} else {
							Result = 0.5;
						}
					} else if (SN > "DEVHITPRATPB") {
						if (SN < "DWARFRDTRAITNCPR") {
							if (SN < "DWARFRDTRAITAGILITY") {
								if (SN < "DEVHITPRATPCAP") {
									if (SN == "DEVHITPRATPC") {
										Result = 0.5;
									}
								} else if (SN > "DEVHITPRATPCAP") {
									if (SN > "DEVHITPRATPCAPR") {
										if (SN == "DWARFLOSTDWARFKDSFATE") {
											Result = -CalcStat("FateT",L,0.4);
										}
									} else if (SN == "DEVHITPRATPCAPR") {
										Result = CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
									}
								} else {
									Result = 10;
								}
							} else if (SN > "DWARFRDTRAITAGILITY") {
								if (SN < "DWARFRDTRAITICPR") {
									if (SN > "DWARFRDTRAITFATE") {
										if (SN == "DWARFRDTRAITICMR") {
											Result = CalcStat("DwarfUnwearBattleICMR",L);
										}
									} else if (SN == "DWARFRDTRAITFATE") {
										Result = CalcStat("DwarfLostDwarfKdsFate",L);
									}
								} else if (SN > "DWARFRDTRAITICPR") {
									if (SN > "DWARFRDTRAITMIGHT") {
										if (SN == "DWARFRDTRAITNCMR") {
											Result = CalcStat("DwarfUnwearBattleNCMR",L);
										}
									} else if (SN == "DWARFRDTRAITMIGHT") {
										Result = CalcStat("DwarfSturdinessMight",L);
									}
								} else {
									Result = CalcStat("DwarfUnwearBattleICPR",L);
								}
							} else {
								Result = CalcStat("DwarfStockyAgility",L);
							}
						} else if (SN > "DWARFRDTRAITNCPR") {
							if (SN < "DWARFSTURDINESSPHYMITP") {
								if (SN < "DWARFRDTRAITVITALITY") {
									if (SN == "DWARFRDTRAITPHYMITP") {
										Result = CalcStat("DwarfSturdinessPhyMitP",L);
									}
								} else if (SN > "DWARFRDTRAITVITALITY") {
									if (SN > "DWARFSTOCKYAGILITY") {
										if (SN == "DWARFSTURDINESSMIGHT") {
											Result = CalcStat("MightT",L,1.0);
										}
									} else if (SN == "DWARFSTOCKYAGILITY") {
										Result = -CalcStat("AgilityT",L,0.4);
									}
								} else {
									Result = CalcStat("DwarfSturdinessVitality",L);
								}
							} else if (SN > "DWARFSTURDINESSPHYMITP") {
								if (SN < "DWARFUNWEARBATTLEICPR") {
									if (SN > "DWARFSTURDINESSVITALITY") {
										if (SN == "DWARFUNWEARBATTLEICMR") {
											Result = CalcStat("ICMRT",L,0.6);
										}
									} else if (SN == "DWARFSTURDINESSVITALITY") {
										Result = CalcStat("VitalityT",L,1.0);
									}
								} else if (SN > "DWARFUNWEARBATTLEICPR") {
									if (SN > "DWARFUNWEARBATTLENCMR") {
										if (SN == "DWARFUNWEARBATTLENCPR") {
											Result = -CalcStat("NCPRT",L,0.4);
										}
									} else if (SN == "DWARFUNWEARBATTLENCMR") {
										Result = -CalcStat("NCMRT",L,0.4);
									}
								} else {
									Result = CalcStat("ICPRT",L,0.6);
								}
							} else {
								Result = 1;
							}
						} else {
							Result = CalcStat("DwarfUnwearBattleNCPR",L);
						}
					} else {
						Result = CalcStat("BRatRounded",L,"BRatDevHit");
					}
				} else if (SN > "ELFAGILITYWOODSAGILITY") {
					if (SN < "FINESSEPRATPCAP") {
						if (SN < "EVADEPRATPA") {
							if (SN < "ELFRDTRAITNCMR") {
								if (SN < "ELFRDTRAITAGILITY") {
									if (SN == "ELFFADINGFIRSTBORNFATE") {
										Result = -CalcStat("FateT",L,0.4);
									}
								} else if (SN > "ELFRDTRAITAGILITY") {
									if (SN > "ELFRDTRAITFATE") {
										if (SN == "ELFRDTRAITMORALE") {
											Result = CalcStat("ElfSorrowFirstbornMorale",L);
										}
									} else if (SN == "ELFRDTRAITFATE") {
										Result = CalcStat("ElfFadingFirstbornFate",L);
									}
								} else {
									Result = CalcStat("ElfAgilityWoodsAgility",L);
								}
							} else if (SN > "ELFRDTRAITNCMR") {
								if (SN < "EVADEPBONUS") {
									if (SN > "ELFSORROWFIRSTBORNMORALE") {
										if (SN == "ELFSORROWFIRSTBORNNCMR") {
											Result = -CalcStat("NCMRT",L,0.4);
										}
									} else if (SN == "ELFSORROWFIRSTBORNMORALE") {
										Result = -CalcStat("MoraleT",L,0.4);
									}
								} else if (SN > "EVADEPBONUS") {
									if (SN > "EVADEPPRAT") {
										if (SN == "EVADEPRATP") {
											Result = CalcStat("BPEPRatP",L,N);
										}
									} else if (SN == "EVADEPPRAT") {
										Result = CalcStat("BPEPPRat",L,N);
									}
								} else {
									Result = CalcStat("BPEPBonus",L);
								}
							} else {
								Result = CalcStat("ElfSorrowFirstbornNCMR",L);
							}
						} else if (SN > "EVADEPRATPA") {
							if (SN < "FATET") {
								if (SN < "EVADEPRATPC") {
									if (SN == "EVADEPRATPB") {
										Result = CalcStat("BPEPRatPB",L);
									}
								} else if (SN > "EVADEPRATPC") {
									if (SN > "EVADEPRATPCAP") {
										if (SN == "EVADEPRATPCAPR") {
											Result = CalcStat("BPEPRatPCapR",L);
										}
									} else if (SN == "EVADEPRATPCAP") {
										Result = CalcStat("BPEPRatPCap",L);
									}
								} else {
									Result = CalcStat("BPEPRatPC",L);
								}
							} else if (SN > "FATET") {
								if (SN < "FINESSEPRATPA") {
									if (SN > "FINESSEPPRAT") {
										if (SN == "FINESSEPRATP") {
											Result = CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
										}
									} else if (SN == "FINESSEPPRAT") {
										Result = CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
									}
								} else if (SN > "FINESSEPRATPA") {
									if (SN > "FINESSEPRATPB") {
										if (SN == "FINESSEPRATPC") {
											Result = 0.5;
										}
									} else if (SN == "FINESSEPRATPB") {
										Result = CalcStat("BRatRounded",L,"BRatStandard");
									}
								} else {
									Result = 150;
								}
							} else {
								Result = RoundDblDown(StatLinInter("PntMPFate","TraitPntSVital","ProgBFate","",L,N,1));
							}
						} else {
							Result = CalcStat("BPEPRatPA",L);
						}
					} else if (SN > "FINESSEPRATPCAP") {
						if (SN < "GUARDIANCDBASEPOWER") {
							if (SN < "GUARDIANCDBASEICMR") {
								if (SN < "GUARDIANCDARMOURTYPE") {
									if (SN == "FINESSEPRATPCAPR") {
										Result = CalcStat("FinessePRatPB",L)*CalcStat("FinessePRatPC",L);
									}
								} else if (SN > "GUARDIANCDARMOURTYPE") {
									if (SN > "GUARDIANCDBASEAGILITY") {
										if (SN == "GUARDIANCDBASEFATE") {
											Result = CalcStat("ClassBaseFate",L);
										}
									} else if (SN == "GUARDIANCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityM",L);
									}
								} else {
									Result = 3;
								}
							} else if (SN > "GUARDIANCDBASEICMR") {
								if (SN < "GUARDIANCDBASEMORALE") {
									if (SN > "GUARDIANCDBASEICPR") {
										if (SN == "GUARDIANCDBASEMIGHT") {
											Result = CalcStat("ClassBaseMightH",L);
										}
									} else if (SN == "GUARDIANCDBASEICPR") {
										Result = CalcStat("ClassBaseICPR",L);
									}
								} else if (SN > "GUARDIANCDBASEMORALE") {
									if (SN > "GUARDIANCDBASENCMR") {
										if (SN == "GUARDIANCDBASENCPR") {
											Result = CalcStat("ClassBaseNCPR",L);
										}
									} else if (SN == "GUARDIANCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRH",L);
									}
								} else {
									Result = CalcStat("ClassBaseMorale",L);
								}
							} else {
								Result = CalcStat("ClassBaseICMRH",L);
							}
						} else if (SN > "GUARDIANCDBASEPOWER") {
							if (SN < "GUARDIANCDCALCTYPETACMIT") {
								if (SN < "GUARDIANCDBASEWILL") {
									if (SN == "GUARDIANCDBASEVITALITY") {
										Result = CalcStat("ClassBaseVitality",L);
									}
								} else if (SN > "GUARDIANCDBASEWILL") {
									if (SN > "GUARDIANCDCALCTYPECOMPHYMIT") {
										if (SN == "GUARDIANCDCALCTYPENONPHYMIT") {
											Result = 14;
										}
									} else if (SN == "GUARDIANCDCALCTYPECOMPHYMIT") {
										Result = 14;
									}
								} else {
									Result = CalcStat("ClassBaseWillL",L);
								}
							} else if (SN > "GUARDIANCDCALCTYPETACMIT") {
								if (SN < "HELFFADINGFIRSTBORNFATE") {
									if (SN > "GUARDIANCDCANBLOCK") {
										if (SN == "GUARDIANCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "GUARDIANCDCANBLOCK") {
										Result = 1;
									}
								} else if (SN > "HELFFADINGFIRSTBORNFATE") {
									if (SN > "HELFPEACEELDARMORALE") {
										if (SN == "HELFPEACEELDARNCMR") {
											Result = CalcStat("NCMRT",L,0.6);
										}
									} else if (SN == "HELFPEACEELDARMORALE") {
										Result = CalcStat("MoraleT",L,1.0);
									}
								} else {
									Result = -CalcStat("FateT",L,0.4);
								}
							} else {
								Result = 27;
							}
						} else {
							Result = CalcStat("ClassBasePower",L);
						}
					} else {
						Result = 50;
					}
				} else {
					Result = CalcStat("AgilityT",L,1.0);
				}
			} else if (SN > "HELFSORROWUNDYINGWILL") {
				if (SN < "LI2ILVLCAP") {
					if (SN < "HUNTERCDBASEWILL") {
						if (SN < "HUNTERCDARMOURTYPE") {
							if (SN < "HOBBITRDTRAITMIGHT") {
								if (SN < "HIGHELFRDTRAITMORALE") {
									if (SN == "HIGHELFRDTRAITFATE") {
										Result = CalcStat("HElfFadingFirstbornFate",L);
									}
								} else if (SN > "HIGHELFRDTRAITMORALE") {
									if (SN > "HIGHELFRDTRAITNCMR") {
										if (SN == "HIGHELFRDTRAITWILL") {
											Result = CalcStat("HElfSorrowUndyingWill",L);
										}
									} else if (SN == "HIGHELFRDTRAITNCMR") {
										Result = CalcStat("HElfPeaceEldarNCMR",L);
									}
								} else {
									Result = CalcStat("HElfPeaceEldarMorale",L);
								}
							} else if (SN > "HOBBITRDTRAITMIGHT") {
								if (SN < "HOBHOBBITTOUGHNVITALITY") {
									if (SN > "HOBBITRDTRAITNCMR") {
										if (SN == "HOBBITRDTRAITVITALITY") {
											Result = CalcStat("HobHobbitToughnVitality",L);
										}
									} else if (SN == "HOBBITRDTRAITNCMR") {
										Result = CalcStat("HobRapidRecoveryNCMR",L);
									}
								} else if (SN > "HOBHOBBITTOUGHNVITALITY") {
									if (SN > "HOBRAPIDRECOVERYNCMR") {
										if (SN == "HOBSMALLSIZEMIGHT") {
											Result = -CalcStat("MightT",L,0.4);
										}
									} else if (SN == "HOBRAPIDRECOVERYNCMR") {
										Result = CalcStat("NCMRT",L,0.6);
									}
								} else {
									Result = CalcStat("VitalityT",L,1.0);
								}
							} else {
								Result = CalcStat("HobSmallSizeMight",L);
							}
						} else if (SN > "HUNTERCDARMOURTYPE") {
							if (SN < "HUNTERCDBASEMIGHT") {
								if (SN < "HUNTERCDBASEFATE") {
									if (SN == "HUNTERCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityH",L);
									}
								} else if (SN > "HUNTERCDBASEFATE") {
									if (SN > "HUNTERCDBASEICMR") {
										if (SN == "HUNTERCDBASEICPR") {
											Result = CalcStat("ClassBaseICPR",L);
										}
									} else if (SN == "HUNTERCDBASEICMR") {
										Result = CalcStat("ClassBaseICMRM",L);
									}
								} else {
									Result = CalcStat("ClassBaseFate",L);
								}
							} else if (SN > "HUNTERCDBASEMIGHT") {
								if (SN < "HUNTERCDBASENCPR") {
									if (SN > "HUNTERCDBASEMORALE") {
										if (SN == "HUNTERCDBASENCMR") {
											Result = CalcStat("ClassBaseNCMRM",L);
										}
									} else if (SN == "HUNTERCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else if (SN > "HUNTERCDBASENCPR") {
									if (SN > "HUNTERCDBASEPOWER") {
										if (SN == "HUNTERCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "HUNTERCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else {
								Result = CalcStat("ClassBaseMightM",L);
							}
						} else {
							Result = 2;
						}
					} else if (SN > "HUNTERCDBASEWILL") {
						if (SN < "INDMGPRATPC") {
							if (SN < "ICMRT") {
								if (SN < "HUNTERCDCALCTYPENONPHYMIT") {
									if (SN == "HUNTERCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else if (SN > "HUNTERCDCALCTYPENONPHYMIT") {
									if (SN > "HUNTERCDCALCTYPETACMIT") {
										if (SN == "HUNTERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "HUNTERCDCALCTYPETACMIT") {
										Result = 26;
									}
								} else {
									Result = 13;
								}
							} else if (SN > "ICMRT") {
								if (SN < "INDMGPRATP") {
									if (SN > "ICPRT") {
										if (SN == "INDMGPPRAT") {
											Result = CalcRatAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCapR",L),N);
										}
									} else if (SN == "ICPRT") {
										Result = EquSng(StatLinInter("PntMPICPR","TraitPntSVital","ProgBICPR","",L,N,0));
									}
								} else if (SN > "INDMGPRATP") {
									if (SN > "INDMGPRATPA") {
										if (SN == "INDMGPRATPB") {
											Result = CalcStat("BRatRounded",L,"BRatStandard");
										}
									} else if (SN == "INDMGPRATPA") {
										Result = 1200;
									}
								} else {
									Result = CalcPercAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCap",L),N);
								}
							} else {
								Result = EquSng(StatLinInter("PntMPICMR","TraitPntSVital","ProgBICMR","",L,N,2));
							}
						} else if (SN > "INDMGPRATPC") {
							if (SN < "INHEALPRATPA") {
								if (SN < "INDMGPRATPCAPR") {
									if (SN == "INDMGPRATPCAP") {
										Result = 400;
									}
								} else if (SN > "INDMGPRATPCAPR") {
									if (SN > "INHEALPPRAT") {
										if (SN == "INHEALPRATP") {
											Result = CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
										}
									} else if (SN == "INHEALPPRAT") {
										Result = CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
									}
								} else {
									Result = CalcStat("InDmgPRatPB",L)*CalcStat("InDmgPRatPC",L);
								}
							} else if (SN > "INHEALPRATPA") {
								if (SN < "INHEALPRATPCAP") {
									if (SN > "INHEALPRATPB") {
										if (SN == "INHEALPRATPC") {
											Result = 0.5;
										}
									} else if (SN == "INHEALPRATPB") {
										Result = CalcStat("BRatRounded",L,"BRatStandard");
									}
								} else if (SN > "INHEALPRATPCAP") {
									if (SN > "INHEALPRATPCAPR") {
										if (SN == "LEVELCAP") {
											Result = 150;
										}
									} else if (SN == "INHEALPRATPCAPR") {
										Result = CalcStat("InHealPRatPB",L)*CalcStat("InHealPRatPC",L);
									}
								} else {
									Result = 25;
								}
							} else {
								Result = 75;
							}
						} else {
							Result = 0.5;
						}
					} else {
						Result = CalcStat("ClassBaseWillL",L);
					}
				} else if (SN > "LI2ILVLCAP") {
					if (SN < "LVLEXPCOSTTOT") {
						if (SN < "LOREMASTERCDBASEMORALE") {
							if (SN < "LOREMASTERCDARMOURTYPE") {
								if (SN < "LI2REFORGECOSTSEG") {
									if (SN == "LI2REFORGECOST") {
										Result = RoundDbl(CalcStat("Li2ReforgeCostSeg",L)*(L+9)*12.5);
									}
								} else if (SN > "LI2REFORGECOSTSEG") {
									if (SN > "LI2REFORGEILVL") {
										if (SN == "LMANCIENTWISDOMWILL") {
											if (Lm <= 105) {
												Result = RoundDbl(1.1*L);
											} else {
												Result = CalcStat("ProgExtLowExpRnd",L,CalcStat("LmAncientWisdomWill",105));
											}
										}
									} else if (SN == "LI2REFORGEILVL") {
										if (Lm <= 145) {
											Result = CalcStat("AwardILvlI",L);
										} else {
											Result = N;
										}
									}
								} else {
									if (Lm <= 0) {
										Result = 0;
									} else if (1 <= Lp && Lm <= 12) {
										Result = DataTableValue([1,1.2,1.4,1.7,2.1,2.5,3,3.6,4.3,5.1,6.4,7.5],L);
									} else if (Lm <= 22) {
										Result = LinFmod(1,8,35,13,22,L);
									} else if (Lm <= 41) {
										Result = LinFmod(1,35.7,48.3,23,41,L);
									} else if (Lm <= 43) {
										Result = LinFmod(1,50,60,42,43,L);
									} else if (Lm <= 48) {
										Result = RoundDbl(LinFmod(1,62.6,77,44,48,L));
									} else if (Lm <= 53) {
										Result = RoundDbl(LinFmod(1,80,99,49,53,L));
									} else if (Lm <= 55) {
										Result = LinFmod(1,103.5,109,54,55,L);
									} else if (Lm <= 61) {
										Result = RoundDbl(LinFmod(1,113.6,145,56,61,L));
									} else if (Lm <= 120) {
										Result = LinFmod(1,153,849,62,120,L);
									} else if (Lm <= 130) {
										Result = LinFmod(1,855,909,121,130,L);
									} else {
										Result = LinFmod(1,914,1009,131,150,L);
									}
								}
							} else if (SN > "LOREMASTERCDARMOURTYPE") {
								if (SN < "LOREMASTERCDBASEICMR") {
									if (SN > "LOREMASTERCDBASEAGILITY") {
										if (SN == "LOREMASTERCDBASEFATE") {
											Result = CalcStat("ClassBaseFate",L);
										}
									} else if (SN == "LOREMASTERCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityL",L);
									}
								} else if (SN > "LOREMASTERCDBASEICMR") {
									if (SN > "LOREMASTERCDBASEICPR") {
										if (SN == "LOREMASTERCDBASEMIGHT") {
											Result = CalcStat("ClassBaseMightM",L);
										}
									} else if (SN == "LOREMASTERCDBASEICPR") {
										Result = CalcStat("ClassBaseICPR",L);
									}
								} else {
									Result = CalcStat("ClassBaseICMRL",L);
								}
							} else {
								Result = 1;
							}
						} else if (SN > "LOREMASTERCDBASEMORALE") {
							if (SN < "LOREMASTERCDBASEWILL") {
								if (SN < "LOREMASTERCDBASENCPR") {
									if (SN == "LOREMASTERCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRL",L);
									}
								} else if (SN > "LOREMASTERCDBASENCPR") {
									if (SN > "LOREMASTERCDBASEPOWER") {
										if (SN == "LOREMASTERCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "LOREMASTERCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else if (SN > "LOREMASTERCDBASEWILL") {
								if (SN < "LOREMASTERCDCALCTYPETACMIT") {
									if (SN > "LOREMASTERCDCALCTYPECOMPHYMIT") {
										if (SN == "LOREMASTERCDCALCTYPENONPHYMIT") {
											Result = 12;
										}
									} else if (SN == "LOREMASTERCDCALCTYPECOMPHYMIT") {
										Result = 12;
									}
								} else if (SN > "LOREMASTERCDCALCTYPETACMIT") {
									if (SN > "LOREMASTERCDHASPOWER") {
										if (SN == "LVLEXPCOST") {
											if (Lm <= 1) {
												Result = 0;
											} else if (Lm <= 5) {
												Result = RoundDbl(12.5*L*L+12.5666666666667*L+24.8666666666667);
											} else if (Lm <= 10) {
												Result = RoundDbl(33.8*L*L-179.48*L+452.6);
											} else if (Lm <= 15) {
												Result = RoundDbl(55.05*L*L-583.77*L+2370.5);
											} else if (Lm <= 20) {
												Result = RoundDbl(76.2*L*L-1196.96*L+6809);
											} else if (Lm <= 25) {
												Result = RoundDbl(97.4*L*L-2023*L+14849.8);
											} else if (Lm <= 30) {
												Result = RoundDbl(118.7*L*L-3066.02 *L+27612.8);
											} else if (Lm <= 35) {
												Result = RoundDbl(139.95*L*L-4319.23*L+46084.1);
											} else if (Lm <= 40) {
												Result = RoundDbl(161.2*L*L-5785.04*L+71356.2);
											} else if (Lm <= 45) {
												Result = RoundDbl(182.5*L*L-7467.38*L+104569.8);
											} else if (Lm <= 50) {
												Result = RoundDbl(203.8*L*L-9363.48*L+146761.8);
											} else if (Lm <= 55) {
												Result = RoundDbl(225.05*L*L-11467.77*L+198851.3);
											} else if (Lm <= 60) {
												Result = RoundDbl(246.3*L*L-13784.46*L+261988);
											} else if (61 <= Lp && Lm <= 70) {
												Result = RoundDbl(ExpFmod(CalcStat("LvlExpCost",60),61,5.071,L,undefined,3.485));
											} else if (71 <= Lp && Lm <= 75) {
												Result = RoundDbl(ExpFmod(CalcStat("LvlExpCost",70),71,5.072,L,undefined,-0.95));
											} else if (76 <= Lp) {
												Result = ExpFmod(CalcStat("LvlExpCost",75),76,5,L,0,-0.5);
											}
										}
									} else if (SN == "LOREMASTERCDHASPOWER") {
										Result = 1;
									}
								} else {
									Result = 25;
								}
							} else {
								Result = CalcStat("ClassBaseWillH",L);
							}
						} else {
							Result = CalcStat("ClassBaseMorale",L);
						}
					} else if (SN > "LVLEXPCOSTTOT") {
						if (SN < "MARINERCDARMOURTYPE") {
							if (SN < "MANGIFTOFMENFATE") {
								if (SN < "MAINT") {
									if (SN == "LVLTOILVL") {
										if (Lm <= 106) {
											Result = LinFmod(1,225,300,105,106,L);
										} else if (Lm <= 115) {
											Result = LinFmod(1,300,349,106,115,L);
										} else if (Lm <= 116) {
											Result = LinFmod(1,349,350,115,116,L);
										} else if (Lm <= 120) {
											Result = LinFmod(1,350,399,116,120,L);
										} else if (Lm <= 121) {
											Result = LinFmod(1,399,400,120,121,L);
										} else if (Lm <= 130) {
											Result = LinFmod(1,400,449,121,130,L);
										} else if (Lm <= 131) {
											Result = LinFmod(1,449,450,130,131,L);
										} else if (Lm <= 140) {
											Result = LinFmod(1,450,499,131,140,L);
										} else if (Lm <= 141) {
											Result = LinFmod(1,499,500,140,141,L);
										} else {
											Result = LinFmod(1,500,549,141,150,L);
										}
									}
								} else if (SN > "MAINT") {
									if (SN > "MANDIMMANKINDWILL") {
										if (SN == "MANEASILYINSPINHEALP") {
											Result = 5;
										}
									} else if (SN == "MANDIMMANKINDWILL") {
										Result = -CalcStat("WillT",L,0.4);
									}
								} else {
									Result = RoundDblDown(StatLinInter("PntMPMain","TraitPntS","ProgBMain","AdjTrait",L,N,1));
								}
							} else if (SN > "MANGIFTOFMENFATE") {
								if (SN < "MANRDTRAITMIGHT") {
									if (SN > "MANRDTRAITFATE") {
										if (SN == "MANRDTRAITINHEALP") {
											Result = CalcStat("ManEasilyInspInHealP",L);
										}
									} else if (SN == "MANRDTRAITFATE") {
										Result = CalcStat("ManGiftOfMenFate",L);
									}
								} else if (SN > "MANRDTRAITMIGHT") {
									if (SN > "MANRDTRAITWILL") {
										if (SN == "MANSTRONGMENMIGHT") {
											Result = CalcStat("MightT",L,1.0);
										}
									} else if (SN == "MANRDTRAITWILL") {
										Result = CalcStat("ManDimMankindWill",L);
									}
								} else {
									Result = CalcStat("ManStrongMenMight",L);
								}
							} else {
								Result = CalcStat("FateT",L,1.0);
							}
						} else if (SN > "MARINERCDARMOURTYPE") {
							if (SN < "MARINERCDBASEMIGHT") {
								if (SN < "MARINERCDBASEFATE") {
									if (SN == "MARINERCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityM",L);
									}
								} else if (SN > "MARINERCDBASEFATE") {
									if (SN > "MARINERCDBASEICMR") {
										if (SN == "MARINERCDBASEICPR") {
											Result = CalcStat("ClassBaseICPR",L);
										}
									} else if (SN == "MARINERCDBASEICMR") {
										Result = CalcStat("ClassBaseICMRL",L);
									}
								} else {
									Result = CalcStat("ClassBaseFate",L);
								}
							} else if (SN > "MARINERCDBASEMIGHT") {
								if (SN < "MARINERCDBASENCPR") {
									if (SN > "MARINERCDBASEMORALE") {
										if (SN == "MARINERCDBASENCMR") {
											Result = CalcStat("ClassBaseNCMRL",L);
										}
									} else if (SN == "MARINERCDBASEMORALE") {
										Result = CalcStat("ClassBaseMorale",L);
									}
								} else if (SN > "MARINERCDBASENCPR") {
									if (SN > "MARINERCDBASEPOWER") {
										if (SN == "MARINERCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "MARINERCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else {
								Result = CalcStat("ClassBaseMightM",L);
							}
						} else {
							Result = 2;
						}
					} else {
						if (1 <= Lp) {
							Result = CalcStat("LvlExpCostTot",L-1)+CalcStat("LvlExpCost",L);
						}
					}
				} else {
					Result = 530;
				}
			} else {
				Result = -CalcStat("WillT",L,0.4);
			}
		} else {
			Result = CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
		}
	} else if (SN > "MARINERCDBASEWILL") {
		if (SN < "PHYMITMPRATPB") {
			if (SN < "PARTBPEPRATP") {
				if (SN < "MITMEDIUMPRATPCAPR") {
					if (SN < "MINSTRELCDCANBLOCK") {
						if (SN < "MINSTRELCDBASEICPR") {
							if (SN < "MIGHTT") {
								if (SN < "MARINERCDCALCTYPENONPHYMIT") {
									if (SN == "MARINERCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else if (SN > "MARINERCDCALCTYPENONPHYMIT") {
									if (SN > "MARINERCDCALCTYPETACMIT") {
										if (SN == "MARINERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "MARINERCDCALCTYPETACMIT") {
										Result = 26;
									}
								} else {
									Result = 13;
								}
							} else if (SN > "MIGHTT") {
								if (SN < "MINSTRELCDBASEAGILITY") {
									if (SN == "MINSTRELCDARMOURTYPE") {
										Result = 1;
									}
								} else if (SN > "MINSTRELCDBASEAGILITY") {
									if (SN > "MINSTRELCDBASEFATE") {
										if (SN == "MINSTRELCDBASEICMR") {
											Result = CalcStat("ClassBaseICMRL",L);
										}
									} else if (SN == "MINSTRELCDBASEFATE") {
										Result = CalcStat("ClassBaseFate",L);
									}
								} else {
									Result = CalcStat("ClassBaseAgilityM",L);
								}
							} else {
								Result = CalcStat("MainT",L,N);
							}
						} else if (SN > "MINSTRELCDBASEICPR") {
							if (SN < "MINSTRELCDBASEPOWER") {
								if (SN < "MINSTRELCDBASEMORALE") {
									if (SN == "MINSTRELCDBASEMIGHT") {
										Result = CalcStat("ClassBaseMightL",L);
									}
								} else if (SN > "MINSTRELCDBASEMORALE") {
									if (SN > "MINSTRELCDBASENCMR") {
										if (SN == "MINSTRELCDBASENCPR") {
											Result = CalcStat("ClassBaseNCPR",L);
										}
									} else if (SN == "MINSTRELCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRL",L);
									}
								} else {
									Result = CalcStat("ClassBaseMorale",L);
								}
							} else if (SN > "MINSTRELCDBASEPOWER") {
								if (SN < "MINSTRELCDCALCTYPECOMPHYMIT") {
									if (SN > "MINSTRELCDBASEVITALITY") {
										if (SN == "MINSTRELCDBASEWILL") {
											Result = CalcStat("ClassBaseWillH",L);
										}
									} else if (SN == "MINSTRELCDBASEVITALITY") {
										Result = CalcStat("ClassBaseVitality",L);
									}
								} else if (SN > "MINSTRELCDCALCTYPECOMPHYMIT") {
									if (SN > "MINSTRELCDCALCTYPENONPHYMIT") {
										if (SN == "MINSTRELCDCALCTYPETACMIT") {
											Result = 25;
										}
									} else if (SN == "MINSTRELCDCALCTYPENONPHYMIT") {
										Result = 12;
									}
								} else {
									Result = 12;
								}
							} else {
								Result = CalcStat("ClassBasePower",L);
							}
						} else {
							Result = CalcStat("ClassBaseICPR",L);
						}
					} else if (SN > "MINSTRELCDCANBLOCK") {
						if (SN < "MITLIGHTPRATPA") {
							if (SN < "MITHEAVYPRATPB") {
								if (SN < "MITHEAVYPPRAT") {
									if (SN == "MINSTRELCDHASPOWER") {
										Result = 1;
									}
								} else if (SN > "MITHEAVYPPRAT") {
									if (SN > "MITHEAVYPRATP") {
										if (SN == "MITHEAVYPRATPA") {
											Result = 180;
										}
									} else if (SN == "MITHEAVYPRATP") {
										Result = CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
									}
								} else {
									Result = CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
								}
							} else if (SN > "MITHEAVYPRATPB") {
								if (SN < "MITHEAVYPRATPCAPR") {
									if (SN > "MITHEAVYPRATPC") {
										if (SN == "MITHEAVYPRATPCAP") {
											Result = 60;
										}
									} else if (SN == "MITHEAVYPRATPC") {
										Result = 0.5;
									}
								} else if (SN > "MITHEAVYPRATPCAPR") {
									if (SN > "MITLIGHTPPRAT") {
										if (SN == "MITLIGHTPRATP") {
											Result = CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
										}
									} else if (SN == "MITLIGHTPPRAT") {
										Result = CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
									}
								} else {
									Result = CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
								}
							} else {
								Result = CalcStat("BRatRounded",L,"BRatMitHeavy");
							}
						} else if (SN > "MITLIGHTPRATPA") {
							if (SN < "MITMEDIUMPPRAT") {
								if (SN < "MITLIGHTPRATPC") {
									if (SN == "MITLIGHTPRATPB") {
										Result = CalcStat("BRatRounded",L,"BRatMitLight");
									}
								} else if (SN > "MITLIGHTPRATPC") {
									if (SN > "MITLIGHTPRATPCAP") {
										if (SN == "MITLIGHTPRATPCAPR") {
											Result = CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
										}
									} else if (SN == "MITLIGHTPRATPCAP") {
										Result = 40;
									}
								} else {
									Result = 0.5;
								}
							} else if (SN > "MITMEDIUMPPRAT") {
								if (SN < "MITMEDIUMPRATPB") {
									if (SN > "MITMEDIUMPRATP") {
										if (SN == "MITMEDIUMPRATPA") {
											Result = 150;
										}
									} else if (SN == "MITMEDIUMPRATP") {
										Result = CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
									}
								} else if (SN > "MITMEDIUMPRATPB") {
									if (SN > "MITMEDIUMPRATPC") {
										if (SN == "MITMEDIUMPRATPCAP") {
											Result = 50;
										}
									} else if (SN == "MITMEDIUMPRATPC") {
										Result = 0.5;
									}
								} else {
									Result = CalcStat("BRatRounded",L,"BRatMitMedium");
								}
							} else {
								Result = CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
							}
						} else {
							Result = 120;
						}
					} else {
						if (20 <= Lp) {
							Result = 1;
						}
					}
				} else if (SN > "MITMEDIUMPRATPCAPR") {
					if (SN < "PARRYPRATPA") {
						if (SN < "OUTDMGPRATPCAPR") {
							if (SN < "OUTDMGPPRAT") {
								if (SN < "MORALETADJ") {
									if (SN == "MORALET") {
										Result = EquSng(StatLinInter("PntMPMorale","TraitPntSVital","ProgBMorale","MoraleTAdj",L,N,1));
									}
								} else if (SN > "MORALETADJ") {
									if (SN > "NCMRT") {
										if (SN == "NCPRT") {
											Result = EquSng(StatLinInter("PntMPNCPR","TraitPntSVital","ProgBNCPR","",L,N,0));
										}
									} else if (SN == "NCMRT") {
										Result = EquSng(StatLinInter("PntMPNCMR","TraitPntSVital","ProgBNCMR","",L,N,2));
									}
								} else {
									if (Lm <= 25) {
										Result = 0.5;
									} else if (Lm <= 50) {
										Result = 0.6;
									} else if (Lm <= 60) {
										Result = 0.7;
									} else if (Lm <= 65) {
										Result = 0.8;
									} else if (Lm <= 75) {
										Result = 0.9;
									} else {
										Result = 1;
									}
								}
							} else if (SN > "OUTDMGPPRAT") {
								if (SN < "OUTDMGPRATPB") {
									if (SN > "OUTDMGPRATP") {
										if (SN == "OUTDMGPRATPA") {
											Result = 600;
										}
									} else if (SN == "OUTDMGPRATP") {
										Result = CalcPercAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCap",L),N);
									}
								} else if (SN > "OUTDMGPRATPB") {
									if (SN > "OUTDMGPRATPC") {
										if (SN == "OUTDMGPRATPCAP") {
											Result = 200;
										}
									} else if (SN == "OUTDMGPRATPC") {
										Result = 0.5;
									}
								} else {
									Result = CalcStat("BRatRounded",L,"BRatExtra");
								}
							} else {
								Result = CalcRatAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCapR",L),N);
							}
						} else if (SN > "OUTDMGPRATPCAPR") {
							if (SN < "OUTHEALPRATPC") {
								if (SN < "OUTHEALPRATP") {
									if (SN == "OUTHEALPPRAT") {
										Result = CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
									}
								} else if (SN > "OUTHEALPRATP") {
									if (SN > "OUTHEALPRATPA") {
										if (SN == "OUTHEALPRATPB") {
											Result = CalcStat("BRatRounded",L,"BRatOutHeal");
										}
									} else if (SN == "OUTHEALPRATPA") {
										Result = 210;
									}
								} else {
									Result = CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
								}
							} else if (SN > "OUTHEALPRATPC") {
								if (SN < "PARRYPBONUS") {
									if (SN > "OUTHEALPRATPCAP") {
										if (SN == "OUTHEALPRATPCAPR") {
											Result = CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
										}
									} else if (SN == "OUTHEALPRATPCAP") {
										Result = 70;
									}
								} else if (SN > "PARRYPBONUS") {
									if (SN > "PARRYPPRAT") {
										if (SN == "PARRYPRATP") {
											Result = CalcStat("BPEPRatP",L,N);
										}
									} else if (SN == "PARRYPPRAT") {
										Result = CalcStat("BPEPPRat",L,N);
									}
								} else {
									Result = CalcStat("BPEPBonus",L);
								}
							} else {
								Result = 0.5;
							}
						} else {
							Result = CalcStat("OutDmgPRatPB",L)*CalcStat("OutDmgPRatPC",L);
						}
					} else if (SN > "PARRYPRATPA") {
						if (SN < "PARTBLOCKMITPRATPCAP") {
							if (SN < "PARTBLOCKMITPBONUS") {
								if (SN < "PARRYPRATPC") {
									if (SN == "PARRYPRATPB") {
										Result = CalcStat("BPEPRatPB",L);
									}
								} else if (SN > "PARRYPRATPC") {
									if (SN > "PARRYPRATPCAP") {
										if (SN == "PARRYPRATPCAPR") {
											Result = CalcStat("BPEPRatPCapR",L);
										}
									} else if (SN == "PARRYPRATPCAP") {
										Result = CalcStat("BPEPRatPCap",L);
									}
								} else {
									Result = CalcStat("BPEPRatPC",L);
								}
							} else if (SN > "PARTBLOCKMITPBONUS") {
								if (SN < "PARTBLOCKMITPRATPA") {
									if (SN > "PARTBLOCKMITPPRAT") {
										if (SN == "PARTBLOCKMITPRATP") {
											Result = CalcStat("PartMitPRatP",L,N);
										}
									} else if (SN == "PARTBLOCKMITPPRAT") {
										Result = CalcStat("PartMitPPRat",L,N);
									}
								} else if (SN > "PARTBLOCKMITPRATPA") {
									if (SN > "PARTBLOCKMITPRATPB") {
										if (SN == "PARTBLOCKMITPRATPC") {
											Result = CalcStat("PartMitPRatPC",L);
										}
									} else if (SN == "PARTBLOCKMITPRATPB") {
										Result = CalcStat("PartMitPRatPB",L);
									}
								} else {
									Result = CalcStat("PartMitPRatPA",L);
								}
							} else {
								Result = CalcStat("PartMitPBonus",L);
							}
						} else if (SN > "PARTBLOCKMITPRATPCAP") {
							if (SN < "PARTBLOCKPRATPA") {
								if (SN < "PARTBLOCKPBONUS") {
									if (SN == "PARTBLOCKMITPRATPCAPR") {
										Result = CalcStat("PartMitPRatPCapR",L);
									}
								} else if (SN > "PARTBLOCKPBONUS") {
									if (SN > "PARTBLOCKPPRAT") {
										if (SN == "PARTBLOCKPRATP") {
											Result = CalcStat("PartBPEPRatP",L,N);
										}
									} else if (SN == "PARTBLOCKPPRAT") {
										Result = CalcStat("PartBPEPPRat",L,N);
									}
								} else {
									Result = CalcStat("PartBPEPBonus",L);
								}
							} else if (SN > "PARTBLOCKPRATPA") {
								if (SN < "PARTBLOCKPRATPCAP") {
									if (SN > "PARTBLOCKPRATPB") {
										if (SN == "PARTBLOCKPRATPC") {
											Result = CalcStat("PartBPEPRatPC",L);
										}
									} else if (SN == "PARTBLOCKPRATPB") {
										Result = CalcStat("PartBPEPRatPB",L);
									}
								} else if (SN > "PARTBLOCKPRATPCAP") {
									if (SN > "PARTBLOCKPRATPCAPR") {
										if (SN == "PARTBPEPPRAT") {
											Result = CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
										}
									} else if (SN == "PARTBLOCKPRATPCAPR") {
										Result = CalcStat("PartBPEPRatPCapR",L);
									}
								} else {
									Result = CalcStat("PartBPEPRatPCap",L);
								}
							} else {
								Result = CalcStat("PartBPEPRatPA",L);
							}
						} else {
							Result = CalcStat("PartMitPRatPCap",L);
						}
					} else {
						Result = CalcStat("BPEPRatPA",L);
					}
				} else {
					Result = CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
				}
			} else if (SN > "PARTBPEPRATP") {
				if (SN < "PARTPARRYMITPBONUS") {
					if (SN < "PARTFINESSEDMGPPRAT") {
						if (SN < "PARTEVADEMITPRATPC") {
							if (SN < "PARTBPEPRATPCAPR") {
								if (SN < "PARTBPEPRATPB") {
									if (SN == "PARTBPEPRATPA") {
										Result = 75;
									}
								} else if (SN > "PARTBPEPRATPB") {
									if (SN > "PARTBPEPRATPC") {
										if (SN == "PARTBPEPRATPCAP") {
											Result = 25;
										}
									} else if (SN == "PARTBPEPRATPC") {
										Result = 0.5;
									}
								} else {
									Result = CalcStat("BRatRounded",L,"BRatPartBPE");
								}
							} else if (SN > "PARTBPEPRATPCAPR") {
								if (SN < "PARTEVADEMITPRATP") {
									if (SN > "PARTEVADEMITPBONUS") {
										if (SN == "PARTEVADEMITPPRAT") {
											Result = CalcStat("PartMitPPRat",L,N);
										}
									} else if (SN == "PARTEVADEMITPBONUS") {
										Result = CalcStat("PartMitPBonus",L);
									}
								} else if (SN > "PARTEVADEMITPRATP") {
									if (SN > "PARTEVADEMITPRATPA") {
										if (SN == "PARTEVADEMITPRATPB") {
											Result = CalcStat("PartMitPRatPB",L);
										}
									} else if (SN == "PARTEVADEMITPRATPA") {
										Result = CalcStat("PartMitPRatPA",L);
									}
								} else {
									Result = CalcStat("PartMitPRatP",L,N);
								}
							} else {
								Result = CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
							}
						} else if (SN > "PARTEVADEMITPRATPC") {
							if (SN < "PARTEVADEPRATP") {
								if (SN < "PARTEVADEMITPRATPCAPR") {
									if (SN == "PARTEVADEMITPRATPCAP") {
										Result = CalcStat("PartMitPRatPCap",L);
									}
								} else if (SN > "PARTEVADEMITPRATPCAPR") {
									if (SN > "PARTEVADEPBONUS") {
										if (SN == "PARTEVADEPPRAT") {
											Result = CalcStat("PartBPEPPRat",L,N);
										}
									} else if (SN == "PARTEVADEPBONUS") {
										Result = CalcStat("PartBPEPBonus",L);
									}
								} else {
									Result = CalcStat("PartMitPRatPCapR",L);
								}
							} else if (SN > "PARTEVADEPRATP") {
								if (SN < "PARTEVADEPRATPC") {
									if (SN > "PARTEVADEPRATPA") {
										if (SN == "PARTEVADEPRATPB") {
											Result = CalcStat("PartBPEPRatPB",L);
										}
									} else if (SN == "PARTEVADEPRATPA") {
										Result = CalcStat("PartBPEPRatPA",L);
									}
								} else if (SN > "PARTEVADEPRATPC") {
									if (SN > "PARTEVADEPRATPCAP") {
										if (SN == "PARTEVADEPRATPCAPR") {
											Result = CalcStat("PartBPEPRatPCapR",L);
										}
									} else if (SN == "PARTEVADEPRATPCAP") {
										Result = CalcStat("PartBPEPRatPCap",L);
									}
								} else {
									Result = CalcStat("PartBPEPRatPC",L);
								}
							} else {
								Result = CalcStat("PartBPEPRatP",L,N);
							}
						} else {
							Result = CalcStat("PartMitPRatPC",L);
						}
					} else if (SN > "PARTFINESSEDMGPPRAT") {
						if (SN < "PARTFINESSEPRATPC") {
							if (SN < "PARTFINESSEDMGPRATPCAP") {
								if (SN < "PARTFINESSEDMGPRATPA") {
									if (SN == "PARTFINESSEDMGPRATP") {
										Result = CalcPercAB(CalcStat("PartFinesseDmgPRatPA",L),CalcStat("PartFinesseDmgPRatPB",L),CalcStat("PartFinesseDmgPRatPCap",L),N);
									}
								} else if (SN > "PARTFINESSEDMGPRATPA") {
									if (SN > "PARTFINESSEDMGPRATPB") {
										if (SN == "PARTFINESSEDMGPRATPC") {
											Result = 0.5;
										}
									} else if (SN == "PARTFINESSEDMGPRATPB") {
										Result = CalcStat("BRatRounded",L,"BRatStandard");
									}
								} else {
									Result = 150;
								}
							} else if (SN > "PARTFINESSEDMGPRATPCAP") {
								if (SN < "PARTFINESSEPRATP") {
									if (SN > "PARTFINESSEDMGPRATPCAPR") {
										if (SN == "PARTFINESSEPPRAT") {
											Result = CalcRatAB(CalcStat("PartFinessePRatPA",L),CalcStat("PartFinessePRatPB",L),CalcStat("PartFinessePRatPCapR",L),N);
										}
									} else if (SN == "PARTFINESSEDMGPRATPCAPR") {
										Result = CalcStat("PartFinesseDmgPRatPB",L)*CalcStat("PartFinesseDmgPRatPC",L);
									}
								} else if (SN > "PARTFINESSEPRATP") {
									if (SN > "PARTFINESSEPRATPA") {
										if (SN == "PARTFINESSEPRATPB") {
											Result = CalcStat("BRatRounded",L,"BRatStandard");
										}
									} else if (SN == "PARTFINESSEPRATPA") {
										Result = 150;
									}
								} else {
									Result = CalcPercAB(CalcStat("PartFinessePRatPA",L),CalcStat("PartFinessePRatPB",L),CalcStat("PartFinessePRatPCap",L),N);
								}
							} else {
								Result = 50;
							}
						} else if (SN > "PARTFINESSEPRATPC") {
							if (SN < "PARTMITPRATP") {
								if (SN < "PARTFINESSEPRATPCAPR") {
									if (SN == "PARTFINESSEPRATPCAP") {
										Result = 50;
									}
								} else if (SN > "PARTFINESSEPRATPCAPR") {
									if (SN > "PARTMITPBONUS") {
										if (SN == "PARTMITPPRAT") {
											Result = CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
										}
									} else if (SN == "PARTMITPBONUS") {
										Result = 0.1;
									}
								} else {
									Result = CalcStat("PartFinessePRatPB",L)*CalcStat("PartFinessePRatPC",L);
								}
							} else if (SN > "PARTMITPRATP") {
								if (SN < "PARTMITPRATPC") {
									if (SN > "PARTMITPRATPA") {
										if (SN == "PARTMITPRATPB") {
											Result = CalcStat("BRatRounded",L,"BRatPartBPE");
										}
									} else if (SN == "PARTMITPRATPA") {
										Result = 105;
									}
								} else if (SN > "PARTMITPRATPC") {
									if (SN > "PARTMITPRATPCAP") {
										if (SN == "PARTMITPRATPCAPR") {
											Result = CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
										}
									} else if (SN == "PARTMITPRATPCAP") {
										Result = 35;
									}
								} else {
									Result = 0.5;
								}
							} else {
								Result = CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
							}
						} else {
							Result = 0.5;
						}
					} else {
						Result = CalcRatAB(CalcStat("PartFinesseDmgPRatPA",L),CalcStat("PartFinesseDmgPRatPB",L),CalcStat("PartFinesseDmgPRatPCapR",L),N);
					}
				} else if (SN > "PARTPARRYMITPBONUS") {
					if (SN < "PHYDMGPRATPCAP") {
						if (SN < "PARTPARRYPRATPA") {
							if (SN < "PARTPARRYMITPRATPC") {
								if (SN < "PARTPARRYMITPRATP") {
									if (SN == "PARTPARRYMITPPRAT") {
										Result = CalcStat("PartMitPPRat",L,N);
									}
								} else if (SN > "PARTPARRYMITPRATP") {
									if (SN > "PARTPARRYMITPRATPA") {
										if (SN == "PARTPARRYMITPRATPB") {
											Result = CalcStat("PartMitPRatPB",L);
										}
									} else if (SN == "PARTPARRYMITPRATPA") {
										Result = CalcStat("PartMitPRatPA",L);
									}
								} else {
									Result = CalcStat("PartMitPRatP",L,N);
								}
							} else if (SN > "PARTPARRYMITPRATPC") {
								if (SN < "PARTPARRYPBONUS") {
									if (SN > "PARTPARRYMITPRATPCAP") {
										if (SN == "PARTPARRYMITPRATPCAPR") {
											Result = CalcStat("PartMitPRatPCapR",L);
										}
									} else if (SN == "PARTPARRYMITPRATPCAP") {
										Result = CalcStat("PartMitPRatPCap",L);
									}
								} else if (SN > "PARTPARRYPBONUS") {
									if (SN > "PARTPARRYPPRAT") {
										if (SN == "PARTPARRYPRATP") {
											Result = CalcStat("PartBPEPRatP",L,N);
										}
									} else if (SN == "PARTPARRYPPRAT") {
										Result = CalcStat("PartBPEPPRat",L,N);
									}
								} else {
									Result = CalcStat("PartBPEPBonus",L);
								}
							} else {
								Result = CalcStat("PartMitPRatPC",L);
							}
						} else if (SN > "PARTPARRYPRATPA") {
							if (SN < "PHYDMGPBONUS") {
								if (SN < "PARTPARRYPRATPC") {
									if (SN == "PARTPARRYPRATPB") {
										Result = CalcStat("PartBPEPRatPB",L);
									}
								} else if (SN > "PARTPARRYPRATPC") {
									if (SN > "PARTPARRYPRATPCAP") {
										if (SN == "PARTPARRYPRATPCAPR") {
											Result = CalcStat("PartBPEPRatPCapR",L);
										}
									} else if (SN == "PARTPARRYPRATPCAP") {
										Result = CalcStat("PartBPEPRatPCap",L);
									}
								} else {
									Result = CalcStat("PartBPEPRatPC",L);
								}
							} else if (SN > "PHYDMGPBONUS") {
								if (SN < "PHYDMGPRATPA") {
									if (SN > "PHYDMGPPRAT") {
										if (SN == "PHYDMGPRATP") {
											Result = CalcStat("OutDmgPRatP",L,N);
										}
									} else if (SN == "PHYDMGPPRAT") {
										Result = CalcStat("OutDmgPPRat",L,N);
									}
								} else if (SN > "PHYDMGPRATPA") {
									if (SN > "PHYDMGPRATPB") {
										if (SN == "PHYDMGPRATPC") {
											Result = CalcStat("OutDmgPRatPC",L);
										}
									} else if (SN == "PHYDMGPRATPB") {
										Result = CalcStat("OutDmgPRatPB",L);
									}
								} else {
									Result = CalcStat("OutDmgPRatPA",L);
								}
							} else {
								Result = CalcStat("OutDmgPBonus",L);
							}
						} else {
							Result = CalcStat("PartBPEPRatPA",L);
						}
					} else if (SN > "PHYDMGPRATPCAP") {
						if (SN < "PHYMITLPPRAT") {
							if (SN < "PHYMITHPRATPA") {
								if (SN < "PHYMITHPBONUS") {
									if (SN == "PHYDMGPRATPCAPR") {
										Result = CalcStat("OutDmgPRatPCapR",L);
									}
								} else if (SN > "PHYMITHPBONUS") {
									if (SN > "PHYMITHPPRAT") {
										if (SN == "PHYMITHPRATP") {
											Result = CalcStat("MitHeavyPRatP",L,N);
										}
									} else if (SN == "PHYMITHPPRAT") {
										Result = CalcStat("MitHeavyPPRat",L,N);
									}
								} else {
									Result = CalcStat("MitHeavyPBonus",L);
								}
							} else if (SN > "PHYMITHPRATPA") {
								if (SN < "PHYMITHPRATPCAP") {
									if (SN > "PHYMITHPRATPB") {
										if (SN == "PHYMITHPRATPC") {
											Result = CalcStat("MitHeavyPRatPC",L);
										}
									} else if (SN == "PHYMITHPRATPB") {
										Result = CalcStat("MitHeavyPRatPB",L);
									}
								} else if (SN > "PHYMITHPRATPCAP") {
									if (SN > "PHYMITHPRATPCAPR") {
										if (SN == "PHYMITLPBONUS") {
											Result = CalcStat("MitLightPBonus",L);
										}
									} else if (SN == "PHYMITHPRATPCAPR") {
										Result = CalcStat("MitHeavyPRatPCapR",L);
									}
								} else {
									Result = CalcStat("MitHeavyPRatPCap",L);
								}
							} else {
								Result = CalcStat("MitHeavyPRatPA",L);
							}
						} else if (SN > "PHYMITLPPRAT") {
							if (SN < "PHYMITLPRATPCAP") {
								if (SN < "PHYMITLPRATPA") {
									if (SN == "PHYMITLPRATP") {
										Result = CalcStat("MitLightPRatP",L,N);
									}
								} else if (SN > "PHYMITLPRATPA") {
									if (SN > "PHYMITLPRATPB") {
										if (SN == "PHYMITLPRATPC") {
											Result = CalcStat("MitLightPRatPC",L);
										}
									} else if (SN == "PHYMITLPRATPB") {
										Result = CalcStat("MitLightPRatPB",L);
									}
								} else {
									Result = CalcStat("MitLightPRatPA",L);
								}
							} else if (SN > "PHYMITLPRATPCAP") {
								if (SN < "PHYMITMPPRAT") {
									if (SN > "PHYMITLPRATPCAPR") {
										if (SN == "PHYMITMPBONUS") {
											Result = CalcStat("MitMediumPBonus",L);
										}
									} else if (SN == "PHYMITLPRATPCAPR") {
										Result = CalcStat("MitLightPRatPCapR",L);
									}
								} else if (SN > "PHYMITMPPRAT") {
									if (SN > "PHYMITMPRATP") {
										if (SN == "PHYMITMPRATPA") {
											Result = CalcStat("MitMediumPRatPA",L);
										}
									} else if (SN == "PHYMITMPRATP") {
										Result = CalcStat("MitMediumPRatP",L,N);
									}
								} else {
									Result = CalcStat("MitMediumPPRat",L,N);
								}
							} else {
								Result = CalcStat("MitLightPRatPCap",L);
							}
						} else {
							Result = CalcStat("MitLightPPRat",L,N);
						}
					} else {
						Result = CalcStat("OutDmgPRatPCap",L);
					}
				} else {
					Result = CalcStat("PartMitPBonus",L);
				}
			} else {
				Result = CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
			}
		} else if (SN > "PHYMITMPRATPB") {
			if (SN < "STDPNTS") {
				if (SN < "REAVERCDCALCTYPETACMIT") {
					if (SN < "PROGBENERGY") {
						if (SN < "PNTMPICPR") {
							if (SN < "PNTMPBPE") {
								if (SN < "PHYMITMPRATPCAP") {
									if (SN == "PHYMITMPRATPC") {
										Result = CalcStat("MitMediumPRatPC",L);
									}
								} else if (SN > "PHYMITMPRATPCAP") {
									if (SN > "PHYMITMPRATPCAPR") {
										if (SN == "PNTMPARMOURPENT") {
											Result = 72/1200;
										}
									} else if (SN == "PHYMITMPRATPCAPR") {
										Result = CalcStat("MitMediumPRatPCapR",L);
									}
								} else {
									Result = CalcStat("MitMediumPRatPCap",L);
								}
							} else if (SN > "PNTMPBPE") {
								if (SN < "PNTMPCLASSBASENCPR") {
									if (SN == "PNTMPCLASSBASEICPR") {
										Result = 0.25;
									}
								} else if (SN > "PNTMPCLASSBASENCPR") {
									if (SN > "PNTMPFATE") {
										if (SN == "PNTMPICMR") {
											Result = 0.03;
										}
									} else if (SN == "PNTMPFATE") {
										Result = 2.5;
									}
								} else {
									Result = 0.5;
								}
							} else {
								Result = 42/1200;
							}
						} else if (SN > "PNTMPICPR") {
							if (SN < "PNTMPPOWERT") {
								if (SN < "PNTMPMORALE") {
									if (SN == "PNTMPMAIN") {
										Result = 0.5;
									}
								} else if (SN > "PNTMPMORALE") {
									if (SN > "PNTMPNCMR") {
										if (SN == "PNTMPNCPR") {
											Result = 1;
										}
									} else if (SN == "PNTMPNCMR") {
										Result = 0.3;
									}
								} else {
									Result = 2;
								}
							} else if (SN > "PNTMPPOWERT") {
								if (SN < "POWERT") {
									if (SN > "PNTMPRESIST") {
										if (SN == "PNTMPVITALITYT") {
											Result = 0.45;
										}
									} else if (SN == "PNTMPRESIST") {
										Result = 36/1200;
									}
								} else if (SN > "POWERT") {
									if (SN > "PROGBARMOUR") {
										if (SN == "PROGBBPE") {
											Result = CalcStat("BRatProgB",L,"BRatStandard");
										}
									} else if (SN == "PROGBARMOUR") {
										Result = CalcStat("BRatProgB",L,"BRatMitMedium");
									}
								} else {
									Result = EquSng(StatLinInter("PntMPPowerT","TraitPntSVital","ProgBPower","",L,N,1));
								}
							} else {
								Result = 1.333;
							}
						} else {
							Result = 0.125;
						}
					} else if (SN > "PROGBENERGY") {
						if (SN < "PROGBRESIST") {
							if (SN < "PROGBMAIN") {
								if (SN < "PROGBHEALTH") {
									if (SN == "PROGBFATE") {
										Result = CalcStat("ProgBEnergy",L);
									}
								} else if (SN > "PROGBHEALTH") {
									if (SN > "PROGBICMR") {
										if (SN == "PROGBICPR") {
											Result = CalcStat("ProgBEnergy",L);
										}
									} else if (SN == "PROGBICMR") {
										Result = CalcStat("ProgBHealth",L);
									}
								} else {
									Result = CalcStat("StdProgHealth",L,4.0);
								}
							} else if (SN > "PROGBMAIN") {
								if (SN < "PROGBNCMR") {
									if (SN > "PROGBMAINBASE") {
										if (SN == "PROGBMORALE") {
											Result = CalcStat("ProgBHealth",L);
										}
									} else if (SN == "PROGBMAINBASE") {
										if (141 <= Lp && Lm <= 150) {
											Result = LinFmod(CalcStat("StdProgRatings",140,1.0),1.15,2,141,150,L,"P");
										} else {
											Result = CalcStat("StdProgRatings",L,1.0);
										}
									}
								} else if (SN > "PROGBNCMR") {
									if (SN > "PROGBNCPR") {
										if (SN == "PROGBPOWER") {
											Result = CalcStat("ProgBEnergy",L);
										}
									} else if (SN == "PROGBNCPR") {
										Result = CalcStat("ProgBEnergy",L);
									}
								} else {
									Result = CalcStat("ProgBHealth",L);
								}
							} else {
								Result = CalcStat("StdProgRatings",L,1.75);
							}
						} else if (SN > "PROGBRESIST") {
							if (SN < "PROGEXTCOMLOWRND") {
								if (SN < "PROGEXTCOMHIGHRAW") {
									if (SN == "PROGBVITALITY") {
										Result = CalcStat("ProgBHealth",L);
									}
								} else if (SN > "PROGEXTCOMHIGHRAW") {
									if (SN > "PROGEXTCOMHIGHRND") {
										if (SN == "PROGEXTCOMLOWRAW") {
											if (116 <= Lp && Lm <= 116) {
												Result = ExpFmod(N,116,20,L);
											} else if (117 <= Lp && Lm <= 120) {
												Result = ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
											} else if (121 <= Lp) {
												Result = CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
											}
										}
									} else if (SN == "PROGEXTCOMHIGHRND") {
										if (121 <= Lp && Lm <= 121) {
											Result = ExpFmod(N,121,20,L,0);
										} else if (122 <= Lp && Lm <= 125) {
											Result = ExpFmod(CalcStat("ProgExtComHighRnd",121,N),122,5.5,L,0);
										} else if (126 <= Lp && Lm <= 126) {
											Result = ExpFmod(CalcStat("ProgExtComHighRnd",125,N),126,20,L,0);
										} else if (127 <= Lp && Lm <= 130) {
											Result = ExpFmod(CalcStat("ProgExtComHighRnd",126,N),127,5.5,L,0);
										} else if (131 <= Lp && Lm <= 131) {
											Result = ExpFmod(CalcStat("ProgExtComHighRnd",130,N),131,20,L,0);
										} else if (132 <= Lp && Lm <= 150) {
											Result = ExpFmod(CalcStat("ProgExtComHighRnd",131,N),132,5.5,L,0);
										} else if (151 <= Lp) {
											Result = CalcStat("ProgExtComHighRnd",150,N);
										}
									}
								} else {
									if (121 <= Lp && Lm <= 121) {
										Result = ExpFmod(N,121,20,L);
									} else if (122 <= Lp && Lm <= 125) {
										Result = ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
									} else if (126 <= Lp && Lm <= 126) {
										Result = ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
									} else if (127 <= Lp && Lm <= 130) {
										Result = ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
									} else if (131 <= Lp && Lm <= 131) {
										Result = ExpFmod(CalcStat("ProgExtComHighRaw",130,N),131,20,L);
									} else if (132 <= Lp && Lm <= 150) {
										Result = ExpFmod(CalcStat("ProgExtComHighRaw",131,N),132,5.5,L);
									} else if (151 <= Lp) {
										Result = CalcStat("ProgExtComHighRaw",150,N);
									}
								}
							} else if (SN > "PROGEXTCOMLOWRND") {
								if (SN < "REAVERCANBLOCK") {
									if (SN > "PROGEXTLOWEXPRND") {
										if (SN == "RACENAME") {
											if (6 <= Lp && Lm <= 6) {
												Result = "Uruk";
											} else if (7 <= Lp && Lm <= 7) {
												Result = "Orc";
											} else if (12 <= Lp && Lm <= 12) {
												Result = "Spider";
											} else if (23 <= Lp && Lm <= 23) {
												Result = "Man";
											} else if (27 <= Lp && Lm <= 27) {
												Result = "Critter";
											} else if (39 <= Lp && Lm <= 39) {
												Result = "Angmarim";
											} else if (65 <= Lp && Lm <= 65) {
												Result = "Elf";
											} else if (66 <= Lp && Lm <= 66) {
												Result = "Warg";
											} else if (73 <= Lp && Lm <= 73) {
												Result = "Dwarf";
											} else if (81 <= Lp && Lm <= 81) {
												Result = "Hobbit";
											} else if (114 <= Lp && Lm <= 114) {
												Result = "Beorning";
											} else if (117 <= Lp && Lm <= 117) {
												Result = "HighElf";
											} else if (120 <= Lp && Lm <= 120) {
												Result = "StoutAxe";
											} else if (125 <= Lp && Lm <= 125) {
												Result = "RiverHobbit";
											} else {
												Result = "";
											}
										}
									} else if (SN == "PROGEXTLOWEXPRND") {
										if (106 <= Lp && Lm <= 115) {
											Result = ExpFmod(N,106,5.5,L,0);
										} else if (116 <= Lp) {
											Result = CalcStat("ProgExtComLowRnd",L,CalcStat("ProgExtLowExpRnd",115,N));
										}
									}
								} else if (SN > "REAVERCANBLOCK") {
									if (SN > "REAVERCDCALCTYPECOMPHYMIT") {
										if (SN == "REAVERCDCALCTYPENONPHYMIT") {
											Result = 14;
										}
									} else if (SN == "REAVERCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else {
									Result = 1;
								}
							} else {
								if (116 <= Lp && Lm <= 116) {
									Result = ExpFmod(N,116,20,L,0);
								} else if (117 <= Lp && Lm <= 120) {
									Result = ExpFmod(CalcStat("ProgExtComLowRnd",116,N),117,5.5,L,0);
								} else if (121 <= Lp) {
									Result = CalcStat("ProgExtComHighRnd",L,CalcStat("ProgExtComLowRnd",120,N));
								}
							}
						} else {
							Result = CalcStat("BRatProgB",L,"BRatExtra");
						}
					} else {
						Result = CalcStat("StdProgEnergy",L,2.0);
					}
				} else if (SN > "REAVERCDCALCTYPETACMIT") {
					if (SN < "RUNEKEEPERCDBASEICPR") {
						if (SN < "RIVERHOBBITRDTRAITFROSTMITP") {
							if (SN < "RESISTPRATPB") {
								if (SN < "RESISTPPRAT") {
									if (SN == "REAVERCDHASPOWER") {
										Result = 1;
									}
								} else if (SN > "RESISTPPRAT") {
									if (SN > "RESISTPRATP") {
										if (SN == "RESISTPRATPA") {
											Result = 150;
										}
									} else if (SN == "RESISTPRATP") {
										Result = CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
									}
								} else {
									Result = CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
								}
							} else if (SN > "RESISTPRATPB") {
								if (SN < "RESISTPRATPCAPR") {
									if (SN > "RESISTPRATPC") {
										if (SN == "RESISTPRATPCAP") {
											Result = 50;
										}
									} else if (SN == "RESISTPRATPC") {
										Result = 0.5;
									}
								} else if (SN > "RESISTPRATPCAPR") {
									if (SN > "RESISTT") {
										if (SN == "RIVERHOBBITRDTRAITAGILITY") {
											Result = CalcStat("RivHobSlipperyAgility",L);
										}
									} else if (SN == "RESISTT") {
										Result = EquSng(StatLinInter("PntMPResist","TraitPntS","ProgBResist","AdjTrait",L,N,1));
									}
								} else {
									Result = CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
								}
							} else {
								Result = CalcStat("BRatRounded",L,"BRatExtra");
							}
						} else if (SN > "RIVERHOBBITRDTRAITFROSTMITP") {
							if (SN < "RIVHOBSLIPPERYAGILITY") {
								if (SN < "RIVERHOBBITRDTRAITWILL") {
									if (SN == "RIVERHOBBITRDTRAITMORALE") {
										Result = CalcStat("RivHobHardyHolbMorale",L);
									}
								} else if (SN > "RIVERHOBBITRDTRAITWILL") {
									if (SN > "RIVHOBHARDYHOLBMORALE") {
										if (SN == "RIVHOBSECLUSIONWILL") {
											Result = -CalcStat("WillT",L,0.4);
										}
									} else if (SN == "RIVHOBHARDYHOLBMORALE") {
										Result = CalcStat("MoraleT",L,1.0);
									}
								} else {
									Result = CalcStat("RivHobSeclusionWill",L);
								}
							} else if (SN > "RIVHOBSLIPPERYAGILITY") {
								if (SN < "RUNEKEEPERCDBASEAGILITY") {
									if (SN > "RIVHOBSWIMMERFROSTMITP") {
										if (SN == "RUNEKEEPERCDARMOURTYPE") {
											Result = 1;
										}
									} else if (SN == "RIVHOBSWIMMERFROSTMITP") {
										Result = 1;
									}
								} else if (SN > "RUNEKEEPERCDBASEAGILITY") {
									if (SN > "RUNEKEEPERCDBASEFATE") {
										if (SN == "RUNEKEEPERCDBASEICMR") {
											Result = CalcStat("ClassBaseICMRL",L);
										}
									} else if (SN == "RUNEKEEPERCDBASEFATE") {
										Result = CalcStat("ClassBaseFate",L);
									}
								} else {
									Result = CalcStat("ClassBaseAgilityL",L);
								}
							} else {
								Result = CalcStat("AgilityT",L,1.0);
							}
						} else {
							Result = CalcStat("RivHobSwimmerFrostMitP",L);
						}
					} else if (SN > "RUNEKEEPERCDBASEICPR") {
						if (SN < "RUNEKEEPERCDHASPOWER") {
							if (SN < "RUNEKEEPERCDBASEPOWER") {
								if (SN < "RUNEKEEPERCDBASEMORALE") {
									if (SN == "RUNEKEEPERCDBASEMIGHT") {
										Result = CalcStat("ClassBaseMightM",L);
									}
								} else if (SN > "RUNEKEEPERCDBASEMORALE") {
									if (SN > "RUNEKEEPERCDBASENCMR") {
										if (SN == "RUNEKEEPERCDBASENCPR") {
											Result = CalcStat("ClassBaseNCPR",L);
										}
									} else if (SN == "RUNEKEEPERCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRL",L);
									}
								} else {
									Result = CalcStat("ClassBaseMorale",L);
								}
							} else if (SN > "RUNEKEEPERCDBASEPOWER") {
								if (SN < "RUNEKEEPERCDCALCTYPECOMPHYMIT") {
									if (SN > "RUNEKEEPERCDBASEVITALITY") {
										if (SN == "RUNEKEEPERCDBASEWILL") {
											Result = CalcStat("ClassBaseWillH",L);
										}
									} else if (SN == "RUNEKEEPERCDBASEVITALITY") {
										Result = CalcStat("ClassBaseVitality",L);
									}
								} else if (SN > "RUNEKEEPERCDCALCTYPECOMPHYMIT") {
									if (SN > "RUNEKEEPERCDCALCTYPENONPHYMIT") {
										if (SN == "RUNEKEEPERCDCALCTYPETACMIT") {
											Result = 25;
										}
									} else if (SN == "RUNEKEEPERCDCALCTYPENONPHYMIT") {
										Result = 12;
									}
								} else {
									Result = 12;
								}
							} else {
								Result = CalcStat("ClassBasePower",L);
							}
						} else if (SN > "RUNEKEEPERCDHASPOWER") {
							if (SN < "SORCERESSCDHASPOWER") {
								if (SN < "SORCERESSCDCALCTYPECOMPHYMIT") {
									if (SN == "SORCERESSCANBLOCK") {
										Result = 1;
									}
								} else if (SN > "SORCERESSCDCALCTYPECOMPHYMIT") {
									if (SN > "SORCERESSCDCALCTYPENONPHYMIT") {
										if (SN == "SORCERESSCDCALCTYPETACMIT") {
											Result = 27;
										}
									} else if (SN == "SORCERESSCDCALCTYPENONPHYMIT") {
										Result = 14;
									}
								} else {
									Result = 13;
								}
							} else if (SN > "SORCERESSCDHASPOWER") {
								if (SN < "STALKERCDCALCTYPENONPHYMIT") {
									if (SN > "STALKERCANBLOCK") {
										if (SN == "STALKERCDCALCTYPECOMPHYMIT") {
											Result = 13;
										}
									} else if (SN == "STALKERCANBLOCK") {
										Result = 1;
									}
								} else if (SN > "STALKERCDCALCTYPENONPHYMIT") {
									if (SN > "STALKERCDCALCTYPETACMIT") {
										if (SN == "STALKERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "STALKERCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else {
								Result = 1;
							}
						} else {
							Result = 1;
						}
					} else {
						Result = CalcStat("ClassBaseICPR",L);
					}
				} else {
					Result = 27;
				}
			} else if (SN > "STDPNTS") {
				if (SN < "TACMITMPBONUS") {
					if (SN < "TACDMGPRATP") {
						if (SN < "STOUTAXERDTRAITWILL") {
							if (SN < "STOUTAXERDTRAITDISEASERESISTP") {
								if (SN < "STDPROGHEALTH") {
									if (SN == "STDPROGENERGY") {
										if (Lm <= 50) {
											Result = LinFmod(N,1,2,1,50,L,"P");
										} else if (Lm <= 60) {
											Result = LinFmod(CalcStat("StdProgEnergy",50,N),1,1.33,50,60,L,"P");
										} else if (Lm <= 65) {
											Result = LinFmod(CalcStat("StdProgEnergy",60,N),1,1.25,60,65,L,"P");
										} else if (Lm <= 75) {
											Result = LinFmod(CalcStat("StdProgEnergy",65,N),1,1.5,65,75,L,"P");
										} else if (Lm <= 85) {
											Result = LinFmod(CalcStat("StdProgEnergy",75,N),1,1.5,75,85,L,"P");
										} else if (Lm <= 95) {
											Result = LinFmod(CalcStat("StdProgEnergy",85,N),1,1.33,85,95,L,"P");
										} else if (Lm <= 100) {
											Result = LinFmod(CalcStat("StdProgEnergy",95,N),1,1.315,95,100,L,"P");
										} else if (Lm <= 105) {
											Result = LinFmod(CalcStat("StdProgEnergy",100,N),1,1.333,100,105,L,"P");
										} else if (Lm <= 115) {
											Result = LinFmod(CalcStat("StdProgEnergy",105,N),1.1,1.5,106,115,L,"P");
										} else if (Lm <= 120) {
											Result = LinFmod(CalcStat("StdProgEnergy",115,N),1.15,1.25,116,120,L,"P");
										} else if (Lm <= 130) {
											Result = LinFmod(CalcStat("StdProgEnergy",120,N),1.15,1.5,121,130,L,"P");
										} else if (Lm <= 140) {
											Result = LinFmod(CalcStat("StdProgEnergy",130,N),1.15,2,131,140,L,"P");
										} else if (Lm <= 150) {
											Result = LinFmod(CalcStat("StdProgEnergy",140,N),1.15,2,141,150,L,"P");
										} else {
											Result = LinFmod(CalcStat("StdProgEnergy",150,N),1,2,151,160,L,"P");
										}
									}
								} else if (SN > "STDPROGHEALTH") {
									if (SN > "STDPROGRATINGS") {
										if (SN == "STOUTAXERDTRAITAGILITY") {
											Result = CalcStat("StoutWrBlackLAgility",L);
										}
									} else if (SN == "STDPROGRATINGS") {
										if (Lm <= 50) {
											Result = LinFmod(N,1,10,1,50,L,"P");
										} else if (Lm <= 60) {
											Result = LinFmod(CalcStat("StdProgRatings",50,N),1,1.5,50,60,L,"P");
										} else if (Lm <= 65) {
											Result = LinFmod(CalcStat("StdProgRatings",60,N),1,1.333,60,65,L,"P");
										} else if (Lm <= 75) {
											Result = LinFmod(CalcStat("StdProgRatings",65,N),1,1.5,65,75,L,"P");
										} else if (Lm <= 85) {
											Result = LinFmod(CalcStat("StdProgRatings",75,N),1,1.5,75,85,L,"P");
										} else if (Lm <= 95) {
											Result = LinFmod(CalcStat("StdProgRatings",85,N),1,1.445,85,95,L,"P");
										} else if (Lm <= 100) {
											Result = LinFmod(CalcStat("StdProgRatings",95,N),1,1.39,95,100,L,"P");
										} else if (Lm <= 105) {
											Result = LinFmod(CalcStat("StdProgRatings",100,N),1,1.33,100,105,L,"P");
										} else if (Lm <= 115) {
											Result = LinFmod(CalcStat("StdProgRatings",105,N),1.1,1.5,106,115,L,"P");
										} else if (Lm <= 120) {
											Result = LinFmod(CalcStat("StdProgRatings",115,N),1.15,1.25,116,120,L,"P");
										} else if (Lm <= 130) {
											Result = LinFmod(CalcStat("StdProgRatings",120,N),1.15,1.5,121,130,L,"P");
										} else if (Lm <= 140) {
											Result = LinFmod(CalcStat("StdProgRatings",130,N),1.15,2,131,140,L,"P");
										} else if (Lm <= 150) {
											Result = LinFmod(CalcStat("StdProgRatings",140,N),1.3,2.205,141,150,L,"P");
										} else {
											Result = LinFmod(CalcStat("StdProgRatings",150,N),1,2,151,160,L,"P");
										}
									}
								} else {
									if (Lm <= 50) {
										Result = LinFmod(N,1,7.5,1,50,L,"P");
									} else if (Lm <= 60) {
										Result = LinFmod(CalcStat("StdProgHealth",50,N),1,1.33,50,60,L,"P");
									} else if (Lm <= 65) {
										Result = LinFmod(CalcStat("StdProgHealth",60,N),1,1.25,60,65,L,"P");
									} else if (Lm <= 75) {
										Result = LinFmod(CalcStat("StdProgHealth",65,N),1,1.5,65,75,L,"P");
									} else if (Lm <= 85) {
										Result = LinFmod(CalcStat("StdProgHealth",75,N),1,1.5,75,85,L,"P");
									} else if (Lm <= 95) {
										Result = LinFmod(CalcStat("StdProgHealth",85,N),1,1.33,85,95,L,"P");
									} else if (Lm <= 100) {
										Result = LinFmod(CalcStat("StdProgHealth",95,N),1,1.5,95,100,L,"P");
									} else if (Lm <= 105) {
										Result = LinFmod(CalcStat("StdProgHealth",100,N),1,1.333,100,105,L,"P");
									} else if (Lm <= 115) {
										Result = LinFmod(CalcStat("StdProgHealth",105,N),1.1,1.5,106,115,L,"P");
									} else if (Lm <= 120) {
										Result = LinFmod(CalcStat("StdProgHealth",115,N),1.15,1.25,116,120,L,"P");
									} else if (Lm <= 130) {
										Result = LinFmod(CalcStat("StdProgHealth",120,N),1.15,1.5,121,130,L,"P");
									} else if (Lm <= 140) {
										Result = LinFmod(CalcStat("StdProgHealth",130,N),1.15,2,131,140,L,"P");
									} else if (Lm <= 150) {
										Result = LinFmod(CalcStat("StdProgHealth",140,N),1.15,2,141,150,L,"P");
									} else {
										Result = LinFmod(CalcStat("StdProgHealth",150,N),1,2,151,160,L,"P");
									}
								}
							} else if (SN > "STOUTAXERDTRAITDISEASERESISTP") {
								if (SN < "STOUTAXERDTRAITPHYMITP") {
									if (SN > "STOUTAXERDTRAITFATE") {
										if (SN == "STOUTAXERDTRAITMIGHT") {
											Result = CalcStat("StoutWrBlackLMight",L);
										}
									} else if (SN == "STOUTAXERDTRAITFATE") {
										Result = CalcStat("StoutDoomDrasaFate",L);
									}
								} else if (SN > "STOUTAXERDTRAITPHYMITP") {
									if (SN > "STOUTAXERDTRAITSHADOWMITP") {
										if (SN == "STOUTAXERDTRAITVITALITY") {
											Result = CalcStat("StoutShadowEyeVitality",L);
										}
									} else if (SN == "STOUTAXERDTRAITSHADOWMITP") {
										Result = CalcStat("StoutWrBlackLShadowMitP",L);
									}
								} else {
									Result = CalcStat("StoutUnyieldingPhyMitP",L);
								}
							} else {
								Result = CalcStat("StoutWrBlackLDiseaseResistP",L);
							}
						} else if (SN > "STOUTAXERDTRAITWILL") {
							if (SN < "STOUTWRBLACKLAGILITY") {
								if (SN < "STOUTSHADOWEYEVITALITY") {
									if (SN == "STOUTDOOMDRASAFATE") {
										Result = -CalcStat("FateT",L,0.4);
									}
								} else if (SN > "STOUTSHADOWEYEVITALITY") {
									if (SN > "STOUTUNYIELDINGPHYMITP") {
										if (SN == "STOUTUNYIELDINGWILL") {
											Result = CalcStat("WillT",L,1.0);
										}
									} else if (SN == "STOUTUNYIELDINGPHYMITP") {
										Result = 1;
									}
								} else {
									Result = -CalcStat("VitalityT",L,0.4);
								}
							} else if (SN > "STOUTWRBLACKLAGILITY") {
								if (SN < "STOUTWRBLACKLSHADOWMITP") {
									if (SN > "STOUTWRBLACKLDISEASERESISTP") {
										if (SN == "STOUTWRBLACKLMIGHT") {
											Result = CalcStat("MightT",L,1.0);
										}
									} else if (SN == "STOUTWRBLACKLDISEASERESISTP") {
										Result = 1;
									}
								} else if (SN > "STOUTWRBLACKLSHADOWMITP") {
									if (SN > "TACDMGPBONUS") {
										if (SN == "TACDMGPPRAT") {
											Result = CalcStat("OutDmgPPRat",L,N);
										}
									} else if (SN == "TACDMGPBONUS") {
										Result = CalcStat("OutDmgPBonus",L);
									}
								} else {
									Result = 1;
								}
							} else {
								Result = CalcStat("AgilityT",L,1.0);
							}
						} else {
							Result = CalcStat("StoutUnyieldingWill",L);
						}
					} else if (SN > "TACDMGPRATP") {
						if (SN < "TACMITHPRATPC") {
							if (SN < "TACDMGPRATPCAPR") {
								if (SN < "TACDMGPRATPB") {
									if (SN == "TACDMGPRATPA") {
										Result = CalcStat("OutDmgPRatPA",L);
									}
								} else if (SN > "TACDMGPRATPB") {
									if (SN > "TACDMGPRATPC") {
										if (SN == "TACDMGPRATPCAP") {
											Result = CalcStat("OutDmgPRatPCap",L);
										}
									} else if (SN == "TACDMGPRATPC") {
										Result = CalcStat("OutDmgPRatPC",L);
									}
								} else {
									Result = CalcStat("OutDmgPRatPB",L);
								}
							} else if (SN > "TACDMGPRATPCAPR") {
								if (SN < "TACMITHPRATP") {
									if (SN > "TACMITHPBONUS") {
										if (SN == "TACMITHPPRAT") {
											Result = CalcStat("MitHeavyPPRat",L,N);
										}
									} else if (SN == "TACMITHPBONUS") {
										Result = CalcStat("MitHeavyPBonus",L);
									}
								} else if (SN > "TACMITHPRATP") {
									if (SN > "TACMITHPRATPA") {
										if (SN == "TACMITHPRATPB") {
											Result = CalcStat("MitHeavyPRatPB",L);
										}
									} else if (SN == "TACMITHPRATPA") {
										Result = CalcStat("MitHeavyPRatPA",L);
									}
								} else {
									Result = CalcStat("MitHeavyPRatP",L,N);
								}
							} else {
								Result = CalcStat("OutDmgPRatPCapR",L);
							}
						} else if (SN > "TACMITHPRATPC") {
							if (SN < "TACMITLPRATP") {
								if (SN < "TACMITHPRATPCAPR") {
									if (SN == "TACMITHPRATPCAP") {
										Result = CalcStat("MitHeavyPRatPCap",L);
									}
								} else if (SN > "TACMITHPRATPCAPR") {
									if (SN > "TACMITLPBONUS") {
										if (SN == "TACMITLPPRAT") {
											Result = CalcStat("MitLightPPRat",L,N);
										}
									} else if (SN == "TACMITLPBONUS") {
										Result = CalcStat("MitLightPBonus",L);
									}
								} else {
									Result = CalcStat("MitHeavyPRatPCapR",L);
								}
							} else if (SN > "TACMITLPRATP") {
								if (SN < "TACMITLPRATPC") {
									if (SN > "TACMITLPRATPA") {
										if (SN == "TACMITLPRATPB") {
											Result = CalcStat("MitLightPRatPB",L);
										}
									} else if (SN == "TACMITLPRATPA") {
										Result = CalcStat("MitLightPRatPA",L);
									}
								} else if (SN > "TACMITLPRATPC") {
									if (SN > "TACMITLPRATPCAP") {
										if (SN == "TACMITLPRATPCAPR") {
											Result = CalcStat("MitLightPRatPCapR",L);
										}
									} else if (SN == "TACMITLPRATPCAP") {
										Result = CalcStat("MitLightPRatPCap",L);
									}
								} else {
									Result = CalcStat("MitLightPRatPC",L);
								}
							} else {
								Result = CalcStat("MitLightPRatP",L,N);
							}
						} else {
							Result = CalcStat("MitHeavyPRatPC",L);
						}
					} else {
						Result = CalcStat("OutDmgPRatP",L,N);
					}
				} else if (SN > "TACMITMPBONUS") {
					if (SN < "WARDENCDBASEMORALE") {
						if (SN < "TPENRESIST") {
							if (SN < "TACMITMPRATPC") {
								if (SN < "TACMITMPRATP") {
									if (SN == "TACMITMPPRAT") {
										Result = CalcStat("MitMediumPPRat",L,N);
									}
								} else if (SN > "TACMITMPRATP") {
									if (SN > "TACMITMPRATPA") {
										if (SN == "TACMITMPRATPB") {
											Result = CalcStat("MitMediumPRatPB",L);
										}
									} else if (SN == "TACMITMPRATPA") {
										Result = CalcStat("MitMediumPRatPA",L);
									}
								} else {
									Result = CalcStat("MitMediumPRatP",L,N);
								}
							} else if (SN > "TACMITMPRATPC") {
								if (SN < "TPENARMOUR") {
									if (SN > "TACMITMPRATPCAP") {
										if (SN == "TACMITMPRATPCAPR") {
											Result = CalcStat("MitMediumPRatPCapR",L);
										}
									} else if (SN == "TACMITMPRATPCAP") {
										Result = CalcStat("MitMediumPRatPCap",L);
									}
								} else if (SN > "TPENARMOUR") {
									if (SN > "TPENBPE") {
										if (SN == "TPENCHOICE") {
											if (1 <= Lp) {
												Result = DataTableValue([0.5,1,2],L);
											}
										}
									} else if (SN == "TPENBPE") {
										Result = -CalcStat("BPET",L,CalcStat("TpenChoice",N));
									}
								} else {
									Result = -CalcStat("ArmourPenT",L,CalcStat("TpenChoice",N));
								}
							} else {
								Result = CalcStat("MitMediumPRatPC",L);
							}
						} else if (SN > "TPENRESIST") {
							if (SN < "WARDENCDARMOURTYPE") {
								if (SN < "TRAITPNTSVITAL") {
									if (SN == "TRAITPNTS") {
										Result = [[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141,150],[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141,150]];
									}
								} else if (SN > "TRAITPNTSVITAL") {
									if (SN > "VITALITYT") {
										if (SN == "VITALITYTADJ") {
											if (Lm <= 25) {
												Result = 0.5;
											} else if (Lm <= 50) {
												Result = 0.6;
											} else if (Lm <= 60) {
												Result = 0.7;
											} else if (Lm <= 65) {
												Result = 0.8;
											} else if (Lm <= 75) {
												Result = 0.9;
											} else {
												Result = 1;
											}
										}
									} else if (SN == "VITALITYT") {
										Result = RoundDblDown(StatLinInter("PntMPVitalityT","TraitPntSVital","ProgBVitality","VitalityTAdj",L,N,1));
									}
								} else {
									Result = [[1,25,50,60,65,75,85,95,100,105,115,120,130,140,141,150],[1,25,50,60,65,75,85,95,100,105,115,120,130,140,141,150]];
								}
							} else if (SN > "WARDENCDARMOURTYPE") {
								if (SN < "WARDENCDBASEICMR") {
									if (SN > "WARDENCDBASEAGILITY") {
										if (SN == "WARDENCDBASEFATE") {
											Result = CalcStat("ClassBaseFate",L);
										}
									} else if (SN == "WARDENCDBASEAGILITY") {
										Result = CalcStat("ClassBaseAgilityH",L);
									}
								} else if (SN > "WARDENCDBASEICMR") {
									if (SN > "WARDENCDBASEICPR") {
										if (SN == "WARDENCDBASEMIGHT") {
											Result = CalcStat("ClassBaseMightM",L);
										}
									} else if (SN == "WARDENCDBASEICPR") {
										Result = CalcStat("ClassBaseICPR",L);
									}
								} else {
									Result = CalcStat("ClassBaseICMRH",L);
								}
							} else {
								Result = 2;
							}
						} else {
							Result = -CalcStat("ResistT",L,CalcStat("TpenChoice",N)*2);
						}
					} else if (SN > "WARDENCDBASEMORALE") {
						if (SN < "WARLEADERCANBLOCK") {
							if (SN < "WARDENCDBASEWILL") {
								if (SN < "WARDENCDBASENCPR") {
									if (SN == "WARDENCDBASENCMR") {
										Result = CalcStat("ClassBaseNCMRH",L);
									}
								} else if (SN > "WARDENCDBASENCPR") {
									if (SN > "WARDENCDBASEPOWER") {
										if (SN == "WARDENCDBASEVITALITY") {
											Result = CalcStat("ClassBaseVitality",L);
										}
									} else if (SN == "WARDENCDBASEPOWER") {
										Result = CalcStat("ClassBasePower",L);
									}
								} else {
									Result = CalcStat("ClassBaseNCPR",L);
								}
							} else if (SN > "WARDENCDBASEWILL") {
								if (SN < "WARDENCDCALCTYPETACMIT") {
									if (SN > "WARDENCDCALCTYPECOMPHYMIT") {
										if (SN == "WARDENCDCALCTYPENONPHYMIT") {
											Result = 13;
										}
									} else if (SN == "WARDENCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else if (SN > "WARDENCDCALCTYPETACMIT") {
									if (SN > "WARDENCDCANBLOCK") {
										if (SN == "WARDENCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "WARDENCDCANBLOCK") {
										Result = 1;
									}
								} else {
									Result = 26;
								}
							} else {
								Result = CalcStat("ClassBaseWillL",L);
							}
						} else if (SN > "WARLEADERCANBLOCK") {
							if (SN < "WEAVERCANBLOCK") {
								if (SN < "WARLEADERCDCALCTYPENONPHYMIT") {
									if (SN == "WARLEADERCDCALCTYPECOMPHYMIT") {
										Result = 14;
									}
								} else if (SN > "WARLEADERCDCALCTYPENONPHYMIT") {
									if (SN > "WARLEADERCDCALCTYPETACMIT") {
										if (SN == "WARLEADERCDHASPOWER") {
											Result = 1;
										}
									} else if (SN == "WARLEADERCDCALCTYPETACMIT") {
										Result = 27;
									}
								} else {
									Result = 14;
								}
							} else if (SN > "WEAVERCANBLOCK") {
								if (SN < "WEAVERCDCALCTYPETACMIT") {
									if (SN > "WEAVERCDCALCTYPECOMPHYMIT") {
										if (SN == "WEAVERCDCALCTYPENONPHYMIT") {
											Result = 14;
										}
									} else if (SN == "WEAVERCDCALCTYPECOMPHYMIT") {
										Result = 13;
									}
								} else if (SN > "WEAVERCDCALCTYPETACMIT") {
									if (SN > "WEAVERCDHASPOWER") {
										if (SN == "WILLT") {
											Result = CalcStat("MainT",L,N);
										}
									} else if (SN == "WEAVERCDHASPOWER") {
										Result = 1;
									}
								} else {
									Result = 27;
								}
							} else {
								Result = 1;
							}
						} else {
							Result = 1;
						}
					} else {
						Result = CalcStat("ClassBaseMorale",L);
					}
				} else {
					Result = CalcStat("MitMediumPBonus",L);
				}
			} else {
				Result = [[1,50,60,65,75,85,95,100,105,106,115,116,120,121,130,131,140,141,150,151,160],[1,50,60,65,75,85,95,100,105,106,115,116,120,121,130,131,140,141,150,151,160]];
			}
		} else {
			Result = CalcStat("MitMediumPRatPB",L);
		}
	} else {
		Result = CalcStat("ClassBaseWillM",L);
	}

	return Result;
}

// Support functions for CalcStat. These consist of implementations of more complex calculation types, decode methods for parameter "C" and rounding/min/max/compare functions for floating point numbers.

// ****************** Calculation Type support functions ******************

// DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
// DataTableValue: Takes a value from an array table.

function DataTableValue(vDataArray, dIndex)
{
	const iIndex = RoundDbl(dIndex);
	return ((iIndex <= 1) ? vDataArray[0] : ((iIndex >= vDataArray.length) ? vDataArray[vDataArray.length-1] : vDataArray[iIndex-1]));
}

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// ExpFmod: Exponential function based on percentage.
// Common percentage values are around ~5.5% for between levels and ~20% jumps between level segments.

function ExpFmod(dVal, dLstart, dPlvl, dLvl, vDec, vAdd)
{
	const dRng = dLvl-dLstart+1.0;
	if (dRng <= DblCalcDev)
		return dVal;
	else {
		const dFac = 1.0+dPlvl/100;
		const dAdd = ((typeof vAdd === "undefined") ? 0.0 : vAdd);
		if (typeof vDec === "undefined") {
			const dFacExp = Math.pow(dFac,dRng);
			return dVal*dFacExp+dAdd*((dFacExp-1.0)/(dFac-1.0));
		}
		else {
			let dResult = dVal;
			let dLm = dLstart-DblCalcDev;
			while (dLm++ <= dLvl)
				dResult = RoundDbl(dResult*dFac+dAdd,vDec);
			return dResult;
		}
	}
}

// IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
// LinInter: Linear Interpolation, given simple graph point data {{levels},{values}}

function LinInter(dProgGraph, dLvl)
{
	// parameter processing
	if (typeof dProgGraph === "undefined") return 0.0;

	// find level interval
	const dLvlMinus = dLvl-DblCalcDev;
	let iPointIndexHigh = 1;
	const iPointIndexMax = dProgGraph[0].length-1;
	while (iPointIndexHigh < iPointIndexMax) {
		if (dLvlMinus <= dProgGraph[0][iPointIndexHigh])
			break;
		iPointIndexHigh++;
	}
	const iPointIndexLow = iPointIndexHigh-1;
		
	// return interpolated value from the calculated graph points
	return LinFmod(1.0,dProgGraph[1][iPointIndexLow],dProgGraph[1][iPointIndexHigh],dProgGraph[0][iPointIndexLow],dProgGraph[0][iPointIndexHigh],dLvl);
}

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// CalcPercAB: Calculates the percentage out of a rating based on the AB formula.

function CalcPercAB(dA, dB, dPCap, dR)
{
	if (dR <= DblCalcDev)
		return 0.0;
	else {
		const dResult = dA/(1.0+dB/dR);
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
		const dResult = dB/(dA/dP-1.0);
		return ((dResult >= dCapR-DblCalcDev) ? dCapR : dResult);
	}
}

// SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// StatLinInter: (Normalized) Stat Linear Interpolating

function StatLinInter(sPntMP, sProgScheme, sProgBase, sAdj, dLvl, vNorC, vRoundType)
{
	let dN = 1.0;
	let sC = "";
	if (typeof vNorC !== "undefined") {
		if (typeof vNorC === "number")
			dN = vNorC;
		else if (typeof vNorC === "string")
			sC = vNorC;
	}

	// parameter processing
	const iRoundType = (typeof vRoundType === "number") ? vRoundType : 0;
	
	const dProgScheme = CalcStat(sProgScheme,dLvl);
	if (typeof dProgScheme === "undefined") return 0.0;

	// find level interval
	const dLvlMinus = dLvl-DblCalcDev;
	let iPointIndexHigh = 1;
	const iPointIndexMax = dProgScheme[0].length-1;
	while (iPointIndexHigh < iPointIndexMax) {
		if (dLvlMinus <= dProgScheme[0][iPointIndexHigh])
			break;
		iPointIndexHigh++;
	}
	const iPointIndexLow = iPointIndexHigh-1;
		
	const dAccessLvlLow = dProgScheme[0][iPointIndexLow];
	const dAccessLvlHigh = dProgScheme[0][iPointIndexHigh];
	const dBaseLvlLow = dProgScheme[1][iPointIndexLow];
	const dBaseLvlHigh = dProgScheme[1][iPointIndexHigh];
	
	// get graph point values
	let dValLow = dBaseLvlLow;
	let dValHigh = dBaseLvlHigh;
	if (typeof sProgBase === "string" && sProgBase.trim() != "") {
		// get values from base progression if given
		dValLow = CalcStat(sProgBase,dBaseLvlLow,sC);
		dValHigh = CalcStat(sProgBase,dBaseLvlHigh,sC);
	}

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

	// graph point roundings - default(0): no rounding
	switch (iRoundType) {
		case 1:
			dValLow = RoundDblLotro(dValLow);
			dValHigh = RoundDblLotro(dValHigh);
			break;
		case 2:
			dValLow = (-1000.0 <= dValLow && dValLow <= 1000.0) ? RoundDblUp(dValLow,(-100.0 <= dValLow && dValLow <= 100.0) ? 2 : 1) : RoundDblLotro(dValLow);
			dValHigh = (-1000.0 <= dValHigh && dValHigh <= 1000.0) ? RoundDblUp(dValHigh,(-100.0 <= dValHigh && dValHigh <= 100.0) ? 2 : 1) : RoundDblLotro(dValHigh);
			break;
		case 3:
			dValLow = RoundDblLotro(dValLow);
			dValLow = (dValLow == -1.0) ? -2.0 : dValLow;
			dValHigh = RoundDblLotro(dValHigh);
			dValHigh = (dValHigh == -1.0) ? -2.0 : dValHigh;
			break;
		case 4:
			dValLow = RoundDblProg(dValLow);
			dValHigh = RoundDblProg(dValHigh);
			break;
		case 5:
			dValLow = RoundDbl(dValLow,0);
			dValHigh = RoundDbl(dValHigh,0);
			break;
	}

	// return interpolated value from the calculated graph points
	return LinFmod(1.0,dValLow,dValHigh,dAccessLvlLow,dAccessLvlHigh,dLvl);
}

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LinFmod: Linear line function between 2 points with some optional modifications.
// Connects point (dLstart,dVal*dFstart) with (dLend,dVal*dFend).
// Usually used with dVal=1 and dFstart/dFend containing unrelated points or dVal=# and dFstart/dFend containing multiplier factors.
// Modification for in-between points on the line: rounding.

function LinFmod(dVal, dFstart, dFend, dLstart, dLend, dLvl, vDec)
{
	if (typeof vDec === "string") {
		const sRoundType = vDec.trim().toUpperCase();
		switch (sRoundType) {
			case "P":
				return LinFmod(1.0,RoundDblProg(dVal*dFstart),RoundDblProg(dVal*dFend),dLstart,dLend,dLvl);
			case "L":
				return LinFmod(1.0,RoundDblLotro(dVal*dFstart),RoundDblLotro(dVal*dFend),dLstart,dLend,dLvl);
			default:
				return LinFmod(1.0,dVal*dFstart,dVal*dFend,dLstart,dLend,dLvl);
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
	const armourcode = sACode.trim().toUpperCase();

	// get positional codes and make some corrections
	let sArmCat = armourcode.substr(0,1);
	let sArmType = armourcode.substr(1,1);
	let sArmCol = armourcode.substr(2,1);
	if (sArmType == "S" && sArmCol == "H") {
		sArmType = "SH";
		sArmCol = armourcode.substr(3,1);
	} else if (sArmCat == "C" && sArmType == "L") {
		sArmCat = "M";
		sArmType = "CL";
	} else
		sArmType = " "+sArmType;
	
	let ind;
	switch (iI) {
		case 1:
			ind = "HML".indexOf(sArmCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			ind = " H SCL C G L BSH".indexOf(sArmType);
			return ((ind == -1) ? 0 : (ind/2)+1);
		case 3:
			ind = "WYPTG".indexOf(sArmCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// QualityCodeIndex: returns a quality index from a Quality Code.
// sQCode string: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function QualityCodeIndex(sQCode)
{
	const ind = "WYPTG".indexOf(sQCode.trim().substr(0,1).toUpperCase());
	return ((ind == -1) ? 0 : ind+1);
}

// WpnCodeIndex: returns a specified index from a Weapon Code.
// sWCode string:
// 1st position: H=heavy, L=light
// 2nd position: O=one-handed, T=two-handed, B=bow
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function WpnCodeIndex(sWCode, iI)
{
	const weaponcode = sWCode.trim().toUpperCase();
	const sWpnCat = weaponcode.substr(0,1);
	const sWpnType = weaponcode.substr(1,1);
	const sWpnCol = weaponcode.substr(2,1);
	
	let ind;
	switch (iI) {
		case 1:
			ind = "HL".indexOf(sWpnCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			ind = "OTB".indexOf(sWpnType);
			return ((ind == -1) ? 0 : ind+1);
		case 3:
			ind = "WYPTG".indexOf(sWpnCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// RomanRankDecode: converts a string with a Roman number in characters, to an integer number.
// used for Legendary Item Title calculation.

const RomanRankChars = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
const RomanRankValues = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function RomanRankDecode(sNumber)
{
	if (typeof sNumber === "string") {
		const sn = sNumber.trim().toUpperCase();
		if (sn.length > 0)
			for (let ind = 0, len = RomanRankChars.length; ind < len; ind++)
				if (sn.indexOf(RomanRankChars[ind]) == 0)
					return RomanRankValues[ind]+RomanRankDecode(sn.slice(RomanRankChars[ind].length));
	}
	return 0;
}

// ****************** Misc. floating point support functions ******************

// Misc. functions for floating point: rounding etc.
// For roundings: vDec is number of decimals.

function CorrectDbl(dNum, dCorrection, dDec)
{
	const lSign = (dNum < 0) ? -1 : 1;
	if (-DblCalcDev <= dDec && dDec <= DblCalcDev)
		return lSign*Math.trunc(lSign*dNum+dCorrection);
	else {
		let lFactor;
		if (dDec >= 0.0) {
			lFactor = Math.pow(10,Math.trunc(dDec+DblCalcDev));
			return lSign*Math.trunc((lSign*lFactor)*dNum+dCorrection)/lFactor;
		}
		else {
			lFactor = Math.pow(10,Math.trunc(-dDec+DblCalcDev));
			return lSign*Math.trunc((lSign/lFactor)*dNum+dCorrection)*lFactor;
		}
	}
}

function RoundDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return CorrectDbl(dNum,0.5+DblCalcDev,0.0);
	else
		return CorrectDbl(dNum,0.5+DblCalcDev,vDec);
}

function RoundDblDown(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return CorrectDbl(dNum,DblCalcDev,0.0);
	else
		return CorrectDbl(dNum,DblCalcDev,vDec);
}

function RoundDblUp(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return CorrectDbl(dNum,1.0-DblCalcDev,0.0);
	else
		return CorrectDbl(dNum,1.0-DblCalcDev,vDec);
}

function RoundDblLotro(dNum)
{
	const dCorrection = 1.0-DblCalcDev;
	const lSign = (dNum < 0) ? -1 : 1;

	const lNumCeiled = Math.trunc(lSign*dNum+dCorrection);
	if (lNumCeiled <= 1000)
		return lSign*lNumCeiled;

	let lFactor = 1;
	let lTestNum = Math.trunc(lNumCeiled/1000);
	while (lTestNum > 0) {
		lTestNum = Math.trunc(lTestNum/10);
		lFactor *= 10;
	}

	return lSign*Math.trunc(lNumCeiled/lFactor+dCorrection)*lFactor;
}

function RoundDblProg(dNum)
{
	if (-DblCalcDev <= dNum && dNum <= DblCalcDev)
		return 0.0;

	const dCorrection = 0.5+DblCalcDev;
	const lSign = (dNum < 0) ? -1 : 1;
	
	const dUnsignedNum = lSign*dNum;
	const lDec = 2-Math.trunc(Math.log10(dUnsignedNum+DblCalcDev)+0.5);

	if (lDec == 0)
		return lSign*Math.trunc(dUnsignedNum+dCorrection);
	else {
		let lFactor;
		if (lDec > 0) {
			lFactor = Math.pow(10,Math.trunc(lDec+DblCalcDev));
			return lSign*Math.trunc(dUnsignedNum*lFactor+dCorrection)/lFactor;
		}
		else {
			lFactor = Math.pow(10,Math.trunc(-lDec+DblCalcDev));
			return lSign*Math.trunc(dUnsignedNum/lFactor+dCorrection)*lFactor;
		}
	}
}

// converts a double value into the equivalent of a single float value
function EquSng(vVal)
{
	const SingleArray = new Float32Array(new ArrayBuffer(4));
	SingleArray[0] = vVal; // stores number in 32-bit
	return SingleArray[0];
}

// converts a double value into the decimal representation of an equivalent single float value
function DecSng(vVal)
{
	const dVal = EquSng(vVal);
	if (dVal == 0.0) {
		// return 0 when 0
		return 0.0;
	}
	// calculate decimals interval for a max total of 8 digit precision
	// 0.09#######: 9 to 2
	// 0.9#######: 8 to 1
	// 9.#######: 7 to 0
	// 9#.######: 6 to -1
	// 9##.#####: 5 to -2 etc
	const iDecMin = 8-(Math.trunc(Math.log10(Math.abs(dVal)))+1);
	const iDecMax = iDecMin-7;
	// result always needs to be rounded at least once, even if the result is not the same as the original equiv. float value
	let dResult = CorrectDbl(dVal,0.5,iDecMin);
	let dTest;
	// search for the least number of decimals, while still keeping the same single value
	for (let iDec = iDecMin-1; iDec >= iDecMax; iDec--) {
		dTest = CorrectDbl(dVal,0.5,iDec); // test value with ever less precision
		if (dTest != dResult) {
			if (EquSng(dTest) == dVal)
				dResult = dTest;
			else
				// (test)value contains no longer the same single value
				break;
		}
	}
	return dResult;
}
