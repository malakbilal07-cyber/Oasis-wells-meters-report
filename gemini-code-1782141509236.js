// ADVACON Wells & Meters Management System Core Data Engine
// Fully pre-loaded baseline data embedded from standard sheets

const baselineWells = [
  { "Well ID": "WELL-001", "Status": "Active", "Latitude": 26.652846, "Longitude": 37.908909, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208455" },
  { "Well ID": "WELL-002", "Status": "Active", "Latitude": 26.655739, "Longitude": 37.909158, "Rehab Status": "Not Maintained", "Flow Meter Connection": "ALH2020807208371" },
  { "Well ID": "WELL-003", "Status": "Active", "Latitude": 26.63384, "Longitude": 37.920219, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF202080714949" },
  { "Well ID": "WELL-004", "Status": "Non-Active", "Latitude": 26.61934, "Longitude": 37.928196, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807125646" },
  { "Well ID": "WELL-005", "Status": "Active", "Latitude": 26.656806, "Longitude": 37.909087, "Rehab Status": "Not Maintained", "Flow Meter Connection": "ALH2020807208480" },
  { "Well ID": "WELL-006", "Status": "Non-Active", "Latitude": 26.628719, "Longitude": 37.916001, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807139756" },
  { "Well ID": "WELL-007", "Status": "Active", "Latitude": 26.626815, "Longitude": 37.915729, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240756" },
  { "Well ID": "WELL-008", "Status": "Active", "Latitude": 26.656111, "Longitude": 37.914167, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208447" },
  { "Well ID": "WELL-009", "Status": "Active", "Latitude": 26.625191, "Longitude": 37.914561, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240751" },
  { "Well ID": "WELL-010", "Status": "Active", "Latitude": 26.653606, "Longitude": 37.916182, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208398" },
  { "Well ID": "WELL-011", "Status": "Active", "Latitude": 26.62266, "Longitude": 37.918991, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240758" },
  { "Well ID": "WELL-012", "Status": "Active", "Latitude": 26.620612, "Longitude": 37.923485, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240757" },
  { "Well ID": "WELL-013", "Status": "Active", "Latitude": 26.656731, "Longitude": 37.911364, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208479" },
  { "Well ID": "WELL-014", "Status": "Active", "Latitude": 26.654714, "Longitude": 37.91039, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208460" },
  { "Well ID": "WELL-015", "Status": "Active", "Latitude": 26.651717, "Longitude": 37.905658, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208412" },
  { "Well ID": "WELL-016", "Status": "Non-Active", "Latitude": 26.651478, "Longitude": 37.905477, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208405" },
  { "Well ID": "WELL-017", "Status": "Active", "Latitude": 26.653457, "Longitude": 37.914275, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208442" },
  { "Well ID": "WELL-018", "Status": "Active", "Latitude": 26.654316, "Longitude": 37.914757, "Rehab Status": "Maintained", "Flow Meter Connection": "ALH2020807208445" },
  { "Well ID": "WELL-019", "Status": "Active", "Latitude": 26.643034, "Longitude": 37.930419, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240744" },
  { "Well ID": "WELL-020", "Status": "Active", "Latitude": 26.640968, "Longitude": 37.933224, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240733" },
  { "Well ID": "WELL-021", "Status": "Active", "Latitude": 26.641662, "Longitude": 37.931818, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240735" },
  { "Well ID": "WELL-022", "Status": "Active", "Latitude": 26.640237, "Longitude": 37.934091, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240732" },
  { "Well ID": "WELL-023", "Status": "Active", "Latitude": 26.638407, "Longitude": 37.935147, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240731" },
  { "Well ID": "WELL-024", "Status": "Active", "Latitude": 26.636605, "Longitude": 37.936306, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240748" },
  { "Well ID": "WELL-025", "Status": "Active", "Latitude": 26.634629, "Longitude": 37.937748, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240734" },
  { "Well ID": "WELL-026", "Status": "Active", "Latitude": 26.633446, "Longitude": 37.938883, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240730" },
  { "Well ID": "WELL-027", "Status": "Active", "Latitude": 26.631557, "Longitude": 37.940428, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240749" },
  { "Well ID": "WELL-028", "Status": "Active", "Latitude": 26.629375, "Longitude": 37.942299, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240728" },
  { "Well ID": "WELL-029", "Status": "Active", "Latitude": 26.626786, "Longitude": 37.944207, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240727" },
  { "Well ID": "WELL-030", "Status": "Active", "Latitude": 26.624794, "Longitude": 37.945899, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240726" },
  { "Well ID": "WELL-031", "Status": "Active", "Latitude": 26.622543, "Longitude": 37.947844, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240747" },
  { "Well ID": "WELL-032", "Status": "Active", "Latitude": 26.620023, "Longitude": 37.949942, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240723" },
  { "Well ID": "WELL-033", "Status": "Active", "Latitude": 26.618635, "Longitude": 37.952541, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240721" },
  { "Well ID": "WELL-034", "Status": "Active", "Latitude": 26.616616, "Longitude": 37.954602, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240720" },
  { "Well ID": "WELL-035", "Status": "Active", "Latitude": 26.615233, "Longitude": 37.956792, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240746" },
  { "Well ID": "WELL-036", "Status": "Active", "Latitude": 26.612864, "Longitude": 37.958564, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240718" },
  { "Well ID": "WELL-037", "Status": "Active", "Latitude": 26.611009, "Longitude": 37.960249, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240717" },
  { "Well ID": "WELL-038", "Status": "Active", "Latitude": 26.608331, "Longitude": 37.962454, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240716" },
  { "Well ID": "WELL-039", "Status": "Active", "Latitude": 26.606272, "Longitude": 37.964239, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240715" },
  { "Well ID": "WELL-040", "Status": "Active", "Latitude": 26.604473, "Longitude": 37.966458, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240741" },
  { "Well ID": "WELL-041", "Status": "Active", "Latitude": 26.602269, "Longitude": 37.968846, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240711" },
  { "Well ID": "WELL-042", "Status": "Active", "Latitude": 26.600109, "Longitude": 37.971217, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240710" },
  { "Well ID": "WELL-043", "Status": "Active", "Latitude": 26.598501, "Longitude": 37.972989, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240708" },
  { "Well ID": "WELL-044", "Status": "Active", "Latitude": 26.596244, "Longitude": 37.975442, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240707" },
  { "Well ID": "WELL-045", "Status": "Active", "Latitude": 26.594191, "Longitude": 37.977461, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240738" },
  { "Well ID": "WELL-046", "Status": "Active", "Latitude": 26.592534, "Longitude": 37.979024, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240705" },
  { "Well ID": "WELL-047", "Status": "Active", "Latitude": 26.589839, "Longitude": 37.981881, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240704" },
  { "Well ID": "WELL-048", "Status": "Active", "Latitude": 26.587823, "Longitude": 37.983917, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240703" },
  { "Well ID": "WELL-049", "Status": "Active", "Latitude": 26.585521, "Longitude": 37.986289, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240702" },
  { "Well ID": "WELL-050", "Status": "Active", "Latitude": 26.583595, "Longitude": 37.988029, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240737" },
  { "Well ID": "WELL-051", "Status": "Active", "Latitude": 26.581561, "Longitude": 37.990141, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240698" },
  { "Well ID": "WELL-052", "Status": "Active", "Latitude": 26.579124, "Longitude": 37.992224, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240697" },
  { "Well ID": "WELL-053", "Status": "Active", "Latitude": 26.577189, "Longitude": 37.994236, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240696" },
  { "Well ID": "WELL-054", "Status": "Active", "Latitude": 26.574672, "Longitude": 37.996503, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240695" },
  { "Well ID": "WELL-055", "Status": "Active", "Latitude": 26.573024, "Longitude": 37.998492, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240736" },
  { "Well ID": "WELL-056", "Status": "Active", "Latitude": 26.570774, "Longitude": 38.000627, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240692" },
  { "Well ID": "WELL-057", "Status": "Active", "Latitude": 26.568478, "Longitude": 38.002492, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240691" },
  { "Well ID": "WELL-058", "Status": "Active", "Latitude": 26.566811, "Longitude": 38.004245, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240690" },
  { "Well ID": "WELL-059", "Status": "Non-Active", "Latitude": 26.564718, "Longitude": 38.006456, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF202087240739" },
  { "Well ID": "WELL-060", "Status": "Active", "Latitude": 26.562729, "Longitude": 38.008405, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240688" },
  { "Well ID": "WELL-061", "Status": "Active", "Latitude": 26.560611, "Longitude": 38.010531, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240687" },
  { "Well ID": "WELL-062", "Status": "Active", "Latitude": 26.558249, "Longitude": 38.012544, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240686" },
  { "Well ID": "WELL-063", "Status": "Active", "Latitude": 26.556271, "Longitude": 38.014631, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240685" },
  { "Well ID": "WELL-064", "Status": "Active", "Latitude": 26.554316, "Longitude": 38.016334, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240684" },
  { "Well ID": "WELL-065", "Status": "Active", "Latitude": 26.552458, "Longitude": 38.018227, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240683" },
  { "Well ID": "WELL-066", "Status": "Active", "Latitude": 26.550241, "Longitude": 38.020588, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240682" },
  { "Well ID": "WELL-067", "Status": "Active", "Latitude": 26.548239, "Longitude": 38.022312, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240681" },
  { "Well ID": "WELL-068", "Status": "Active", "Latitude": 26.546311, "Longitude": 38.024227, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240680" },
  { "Well ID": "WELL-069", "Status": "Active", "Latitude": 26.544158, "Longitude": 38.026414, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240679" },
  { "Well ID": "WELL-070", "Status": "Active", "Latitude": 26.542031, "Longitude": 38.028445, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240678" },
  { "Well ID": "WELL-071", "Status": "Active", "Latitude": 26.539824, "Longitude": 38.030522, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240677" },
  { "Well ID": "WELL-072", "Status": "Active", "Latitude": 26.537618, "Longitude": 38.032641, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240676" },
  { "Well ID": "WELL-073", "Status": "Active", "Latitude": 26.535649, "Longitude": 38.034563, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240675" },
  { "Well ID": "WELL-074", "Status": "Active", "Latitude": 26.533814, "Longitude": 38.036611, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240674" },
  { "Well ID": "WELL-075", "Status": "Active", "Latitude": 26.531773, "Longitude": 38.038592, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240673" },
  { "Well ID": "WELL-076", "Status": "Active", "Latitude": 26.529815, "Longitude": 38.040662, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240672" },
  { "Well ID": "WELL-077", "Status": "Active", "Latitude": 26.527814, "Longitude": 38.042551, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240671" },
  { "Well ID": "WELL-078", "Status": "Active", "Latitude": 26.525662, "Longitude": 38.044569, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240670" },
  { "Well ID": "WELL-079", "Status": "Active", "Latitude": 26.523415, "Longitude": 38.046831, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240669" },
  { "Well ID": "WELL-080", "Status": "Active", "Latitude": 26.521561, "Longitude": 38.048772, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240668" },
  { "Well ID": "WELL-081", "Status": "Active", "Latitude": 26.519441, "Longitude": 38.050631, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240667" },
  { "Well ID": "WELL-082", "Status": "Active", "Latitude": 26.495015, "Longitude": 38.054324, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240637" },
  { "Well ID": "WELL-083", "Status": "Non-Active", "Latitude": 26.493116, "Longitude": 38.056024, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240636" },
  { "Well ID": "WELL-084", "Status": "Active", "Latitude": 26.491321, "Longitude": 38.057814, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240635" },
  { "Well ID": "WELL-085", "Status": "Active", "Latitude": 26.489114, "Longitude": 38.059762, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240634" },
  { "Well ID": "WELL-086", "Status": "Active", "Latitude": 26.487109, "Longitude": 38.061732, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240633" },
  { "Well ID": "WELL-087", "Status": "Non-Active", "Latitude": 26.484839, "Longitude": 38.063715, "Rehab Status": "Maintained", "Flow Meter Connection": "ECC2420832014018" },
  { "Well ID": "WELL-088", "Status": "Active", "Latitude": 26.482741, "Longitude": 38.065719, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240631" },
  { "Well ID": "WELL-089", "Status": "Active", "Latitude": 26.480729, "Longitude": 38.067631, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240630" },
  { "Well ID": "WELL-090", "Status": "Active", "Latitude": 26.478611, "Longitude": 38.069772, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240629" },
  { "Well ID": "WELL-091", "Status": "Active", "Latitude": 26.476414, "Longitude": 38.071728, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240628" },
  { "Well ID": "WELL-092", "Status": "Active", "Latitude": 26.474135, "Longitude": 38.073841, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240627" },
  { "Well ID": "WELL-093", "Status": "Active", "Latitude": 26.472218, "Longitude": 38.075729, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240626" },
  { "Well ID": "WELL-094", "Status": "Active", "Latitude": 26.470002, "Longitude": 38.077845, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240625" },
  { "Well ID": "WELL-095", "Status": "Active", "Latitude": 26.468114, "Longitude": 38.079714, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240624" },
  { "Well ID": "WELL-096", "Status": "Active", "Latitude": 26.466031, "Longitude": 38.081734, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240623" },
  { "Well ID": "WELL-097", "Status": "Active", "Latitude": 26.464019, "Longitude": 38.083515, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240622" },
  { "Well ID": "WELL-098", "Status": "Active", "Latitude": 26.462002, "Longitude": 38.085529, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240621" },
  { "Well ID": "WELL-099", "Status": "Active", "Latitude": 26.459735, "Longitude": 38.087614, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240620" },
  { "Well ID": "WELL-100", "Status": "Active", "Latitude": 26.457811, "Longitude": 38.089531, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240619" },
  { "Well ID": "WELL-101", "Status": "Non-Active", "Latitude": 26.455716, "Longitude": 38.091534, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240618" },
  { "Well ID": "WELL-102", "Status": "Active", "Latitude": 26.453662, "Longitude": 38.093415, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240617" },
  { "Well ID": "WELL-103", "Status": "Active", "Latitude": 26.451431, "Longitude": 38.095529, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240616" },
  { "Well ID": "WELL-104", "Status": "Active", "Latitude": 26.449524, "Longitude": 38.097514, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240615" },
  { "Well ID": "WELL-105", "Status": "Active", "Latitude": 26.447318, "Longitude": 38.099516, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240614" },
  { "Well ID": "WELL-106", "Status": "Active", "Latitude": 26.445211, "Longitude": 38.101534, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240613" },
  { "Well ID": "WELL-107", "Status": "Active", "Latitude": 26.443003, "Longitude": 38.103641, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240612" },
  { "Well ID": "WELL-108", "Status": "Active", "Latitude": 26.441115, "Longitude": 38.105529, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240611" },
  { "Well ID": "WELL-109", "Status": "Active", "Latitude": 26.439004, "Longitude": 38.107514, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240610" },
  { "Well ID": "WELL-110", "Status": "Active", "Latitude": 26.436991, "Longitude": 38.109529, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240609" },
  { "Well ID": "WELL-111", "Status": "Active", "Latitude": 26.434811, "Longitude": 38.111534, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240608" },
  { "Well ID": "WELL-112", "Status": "Active", "Latitude": 26.432822, "Longitude": 38.113414, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240607" },
  { "Well ID": "WELL-113", "Status": "Active", "Latitude": 26.430731, "Longitude": 38.115424, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240606" },
  { "Well ID": "WELL-114", "Status": "Active", "Latitude": 26.428612, "Longitude": 38.117462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240605" },
  { "Well ID": "WELL-115", "Status": "Active", "Latitude": 26.426553, "Longitude": 38.119431, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240604" },
  { "Well ID": "WELL-116", "Status": "Active", "Latitude": 26.424411, "Longitude": 38.121462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240603" },
  { "Well ID": "WELL-117", "Status": "Active", "Latitude": 26.422315, "Longitude": 38.123414, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240602" },
  { "Well ID": "WELL-118", "Status": "Active", "Latitude": 26.420231, "Longitude": 38.125462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240601" },
  { "Well ID": "WELL-119", "Status": "Active", "Latitude": 26.418241, "Longitude": 38.127415, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240600" },
  { "Well ID": "WELL-120", "Status": "Active", "Latitude": 26.416112, "Longitude": 38.129462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240599" },
  { "Well ID": "WELL-121", "Status": "Active", "Latitude": 26.414003, "Longitude": 38.131435, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240598" },
  { "Well ID": "WELL-122", "Status": "Active", "Latitude": 26.411991, "Longitude": 38.133462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240597" },
  { "Well ID": "WELL-123", "Status": "Active", "Latitude": 26.409822, "Longitude": 38.135414, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240596" },
  { "Well ID": "WELL-124", "Status": "Active", "Latitude": 26.407731, "Longitude": 38.137462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240595" },
  { "Well ID": "WELL-125", "Status": "Active", "Latitude": 26.405612, "Longitude": 38.139434, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240594" },
  { "Well ID": "WELL-126", "Status": "Active", "Latitude": 26.403551, "Longitude": 38.141461, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240593" },
  { "Well ID": "WELL-127", "Status": "Active", "Latitude": 26.401412, "Longitude": 38.143431, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240592" },
  { "Well ID": "WELL-128", "Status": "Active", "Latitude": 26.399314, "Longitude": 38.145462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240591" },
  { "Well ID": "WELL-129", "Status": "Active", "Latitude": 26.397223, "Longitude": 38.147415, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240590" },
  { "Well ID": "WELL-130", "Status": "Active", "Latitude": 26.395111, "Longitude": 38.149462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240589" },
  { "Well ID": "WELL-131", "Status": "Active", "Latitude": 26.393004, "Longitude": 38.151431, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240588" },
  { "Well ID": "WELL-132", "Status": "Active", "Latitude": 26.390991, "Longitude": 38.153462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240587" },
  { "Well ID": "WELL-133", "Status": "Active", "Latitude": 26.388822, "Longitude": 38.155414, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240586" },
  { "Well ID": "WELL-134", "Status": "Active", "Latitude": 26.386731, "Longitude": 38.157462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240585" },
  { "Well ID": "WELL-135", "Status": "Active", "Latitude": 26.384612, "Longitude": 38.159434, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240584" },
  { "Well ID": "WELL-136", "Status": "Active", "Latitude": 26.382551, "Longitude": 38.141461, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240583" },
  { "Well ID": "WELL-137", "Status": "Active", "Latitude": 26.380412, "Longitude": 38.143431, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240594" },
  { "Well ID": "WELL-138", "Status": "Active", "Latitude": 26.378314, "Longitude": 38.145462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240593" },
  { "Well ID": "WELL-139", "Status": "Active", "Latitude": 26.376223, "Longitude": 38.147415, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240592" },
  { "Well ID": "WELL-140", "Status": "Active", "Latitude": 26.374111, "Longitude": 38.149462, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240591" },
  { "Well ID": "WELL-141", "Status": "Active", "Latitude": 26.372004, "Longitude": 38.151431, "Rehab Status": "Maintained", "Flow Meter Connection": "MMF2020807240590" }
];

const baselineMeters = [
  { "Meter Serial Number": "MMF2020807240744", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "19" },
  { "Meter Serial Number": "MMF202087240739", "Status Condition": "Not Working", "Meter Type": "Industrial Breakered", "Initial Reading": "59" },
  { "Meter Serial Number": "MMF2020807240662", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "175" },
  { "Meter Serial Number": "MMF202087240738", "Status Condition": "Not Working", "Meter Type": "Industrial Breakered", "Initial Reading": "None" },
  { "Meter Serial Number": "ASH2420800125487", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "203" },
  { "Meter Serial Number": "MMF2020807240782", "Status Condition": "Not Working", "Meter Type": "Industrial Breakered", "Initial Reading": "None" },
  { "Meter Serial Number": "MMF2020807240637", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "082+160" },
  { "Meter Serial Number": "MMF2020807240636", "Status Condition": "Not Working", "Meter Type": "Industrial Breakered", "Initial Reading": "None" },
  { "Meter Serial Number": "ECC2420832014018", "Status Condition": "Not Working", "Meter Type": "Industrial Breakered", "Initial Reading": "None" },
  { "Meter Serial Number": "MMF2020807240635", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "84" },
  { "Meter Serial Number": "MMF2020807240634", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "85" },
  { "Meter Serial Number": "MMF2020807240633", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "86" },
  { "Meter Serial Number": "MMF2020807240632", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "176" },
  { "Meter Serial Number": "MMF2020807240631", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "88" },
  { "Meter Serial Number": "MMF2020807240630", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "89" },
  { "Meter Serial Number": "MMF2020807240629", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "90" },
  { "Meter Serial Number": "MMF2020807240628", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "91" },
  { "Meter Serial Number": "MMF2020807240627", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "92" },
  { "Meter Serial Number": "MMF2020807240626", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "93" },
  { "Meter Serial Number": "MMF2020807240625", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "94" },
  { "Meter Serial Number": "MMF2020807240624", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "95" },
  { "Meter Serial Number": "MMF2020807240623", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "96" },
  { "Meter Serial Number": "MMF2020807240622", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "97" },
  { "Meter Serial Number": "MMF2020807240621", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "98" },
  { "Meter Serial Number": "MMF2020807240620", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "99" },
  { "Meter Serial Number": "MMF2020807240619", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "100" },
  { "Meter Serial Number": "MMF2020807240618", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "101" },
  { "Meter Serial Number": "MMF2020807240617", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "102" },
  { "Meter Serial Number": "MMF2020807240616", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "103" },
  { "Meter Serial Number": "MMF2020807240615", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "104" },
  { "Meter Serial Number": "MMF2020807240614", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "105" },
  { "Meter Serial Number": "MMF2020807240613", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "106" },
  { "Meter Serial Number": "MMF2020807240612", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "107" },
  { "Meter Serial Number": "MMF2020807240611", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "108" },
  { "Meter Serial Number": "MMF2020807240610", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "109" },
  { "Meter Serial Number": "MMF2020807240609", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "110" },
  { "Meter Serial Number": "MMF2020807240608", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "111" },
  { "Meter Serial Number": "MMF2020807240607", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "112" },
  { "Meter Serial Number": "MMF2020807240606", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "113" },
  { "Meter Serial Number": "MMF2020807240605", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "114" },
  { "Meter Serial Number": "MMF2020807240604", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "115" },
  { "Meter Serial Number": "MMF2020807240603", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "116" },
  { "Meter Serial Number": "MMF2020807240602", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "117" },
  { "Meter Serial Number": "MMF2020807240601", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "118" },
  { "Meter Serial Number": "MMF2020807240600", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "119" },
  { "Meter Serial Number": "MMF2020807240599", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "120" },
  { "Meter Serial Number": "MMF2020807240598", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "121" },
  { "Meter Serial Number": "MMF2020807240597", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "122" },
  { "Meter Serial Number": "MMF2020807240596", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "123" },
  { "Meter Serial Number": "MMF2020807240595", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "124" },
  { "Meter Serial Number": "MMF2020807240594", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "125" },
  { "Meter Serial Number": "MMF2020807240593", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "126" },
  { "Meter Serial Number": "MMF2020807240592", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "127" },
  { "Meter Serial Number": "MMF2020807240591", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "128" },
  { "Meter Serial Number": "MMF2020807240590", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "129" },
  { "Meter Serial Number": "MMF2020807240589", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "130" },
  { "Meter Serial Number": "MMF2020807240588", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "131" },
  { "Meter Serial Number": "MMF2020807240587", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "132" },
  { "Meter Serial Number": "MMF2020807240586", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "133" },
  { "Meter Serial Number": "MMF2020807240585", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "134" },
  { "Meter Serial Number": "MMF2020807240584", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "135" },
  { "Meter Serial Number": "MMF2020807240583", "Status Condition": "Working", "Meter Type": "Industrial Breakered", "Initial Reading": "136" }
];

// STATE MANAGEMENT (Preserves session updates alongside baseline metrics)
let appWells = [];
let appMeters = [];
let mapInstance = null;
let mapMarkersGroup = null;
let activeMapFilter = 'all'; 

// INITIALIZATION LOGIC
window.addEventListener('DOMContentLoaded', () => {
    // Check localStorage fallback or pull baseline datasets directly
    const storedWells = localStorage.getItem('advacon_wells_data');
    const storedMeters = localStorage.getItem('advacon_meters_data');
    
    appWells = storedWells ? JSON.parse(storedWells) : [...baselineWells];
    appMeters = storedMeters ? JSON.parse(storedMeters) : [...baselineMeters];
    
    initializeLeafletMap();
    recalculateDashboardMetrics();
    renderAllTables();
});

// INTERACTIVE LEAFLET GEOSPATIAL MAP COMPONENT
function initializeLeafletMap() {
    // Centered around the standard well distribution GPS coordinates cluster area
    mapInstance = L.map('map').setView([26.52, 38.03], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap Core Contributors | ADVACON Geo-Engine'
    }).addTo(mapInstance);
    
    mapMarkersGroup = L.layerGroup().addTo(mapInstance);
    populateMapMarkers();
}

function populateMapMarkers() {
    mapMarkersGroup.clearLayers();
    let renderCount = 0;
    
    appWells.forEach(well => {
        if (!well.Latitude || !well.Longitude) return;
        
        // Apply active quick-toggle status filtering
        if (activeMapFilter === 'active' && well.Status !== 'Active') return;
        if (activeMapFilter === 'inactive' && well.Status !== 'Non-Active') return;
        
        // Emerald marker for active systems, Amber for non-operational systems
        const markerColor = well.Status === 'Active' ? '#10b981' : '#f59e0b';
        
        const customMarkerHtml = `
            <div style="
                background-color: ${markerColor}; 
                width: 14px; 
                height: 14px; 
                border-radius: 50%; 
                border: 2px solid white; 
                box-shadow: 0 0 6px rgba(0,0,0,0.4);
            "></div>`;
            
        const markerIcon = L.divIcon({
            html: customMarkerHtml,
            className: 'custom-geo-dot',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });
        
        const popupContent = `
            <div class="font-sans text-xs space-y-1">
                <p class="font-bold text-sm text-slate-900">${well["Well ID"]}</p>
                <p><span class="font-medium text-gray-500">Status:</span> <span class="px-1.5 py-0.5 text-[10px] font-bold rounded ${well.Status === 'Active' ? 'bg-emerald-100 text-emerald-800':'bg-amber-100 text-amber-800'}">${well.Status}</span></p>
                <p><span class="font-medium text-gray-500">Rehab Status:</span> ${well["Rehab Status"]}</p>
                <p class="truncate"><span class="font-medium text-gray-500">Connected Serial:</span> <code class="bg-gray-100 px-1 rounded">${well["Flow Meter Connection"]}</code></p>
                <p class="text-[10px] text-gray-400 mt-1">${well.Latitude.toFixed(5)}, ${well.Longitude.toFixed(5)}</p>
            </div>
        `;
        
        L.marker([well.Latitude, well.Longitude], { icon: markerIcon })
         .bindPopup(popupContent)
         .addTo(mapMarkersGroup);
         
         renderCount++;
    });
}

// QUICK FILTER MAP ASSET METRICS
function filterMap(filterType) {
    activeMapFilter = filterType;
    const labelEl = document.getElementById('map-filter-label');
    
    if(filterType === 'all') labelEl.innerText = "Showing All Systems";
    if(filterType === 'active') labelEl.innerText = "Isolating Active Operations Only";
    if(filterType === 'inactive') labelEl.innerText = "Isolating Standby/Non-Active Only";
    
    populateMapMarkers();
}

// RE-CALCULATE DATA STATS FOR DASHBOARD SUMMARY COUNTERS
function recalculateDashboardMetrics() {
    const totalWells = appWells.length;
    const activeWells = appWells.filter(w => w.Status === 'Active').length;
    const inactiveWells = appWells.filter(w => w.Status === 'Non-Active').length;
    
    const totalMeters = appMeters.length;
    const workingMeters = appMeters.filter(m => m["Status Condition"] === 'Working').length;
    const defectiveMeters = appMeters.filter(m => m["Status Condition"] !== 'Working').length;
    
    const maintainedWells = appWells.filter(w => w["Rehab Status"] === 'Maintained' || w["Rehab Status"] === 'Completed').length;
    const connectedToFlow = appWells.filter(w => w["Flow Meter Connection"] && w["Flow Meter Connection"] !== 'None').length;

    // Direct interface data-bind updating
    document.getElementById('stat-total-wells').innerText = totalWells;
    document.getElementById('stat-active-wells').innerText = activeWells;
    document.getElementById('stat-inactive-wells').innerText = inactiveWells;
    document.getElementById('stat-total-meters').innerText = totalMeters;
    document.getElementById('stat-working-meters').innerText = `${workingMeters} Functional Units Online`;
    
    document.getElementById('sum-well-rehab').innerText = maintainedWells;
    document.getElementById('sum-well-flow').innerText = connectedToFlow;
    document.getElementById('sum-meter-working').innerText = workingMeters;
    document.getElementById('sum-meter-broken').innerText = defectiveMeters;
}

// RE-RENDER SEARCHABLE DIRECTORY DATA TABLES
function renderAllTables() {
    const wellSearchQuery = document.getElementById('search-wells').value.toLowerCase();
    const wellStatusFilter = document.getElementById('filter-well-status').value;
    const meterSearchQuery = document.getElementById('search-meters').value.toLowerCase();
    
    // 1. WELLS DIRECTORY BINDING
    const wellsBody = document.getElementById('table-wells-body');
    wellsBody.innerHTML = '';
    
    appWells.forEach((well, index) => {
        const matchesSearch = well["Well ID"].toLowerCase().includes(wellSearchQuery) || 
                              well["Flow Meter Connection"].toLowerCase().includes(wellSearchQuery);
        const matchesStatus = wellStatusFilter === 'all' || well.Status === wellStatusFilter;
        
        if (!matchesSearch || !matchesStatus) return;
        
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50 transition border-b";
        row.innerHTML = `
            <td class="p-3 font-semibold text-slate-900">${well["Well ID"]}</td>
            <td class="p-3">
                <span class="px-2 py-1 text-xs font-bold rounded-full ${well.Status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${well.Status}
                </span>
            </td>
            <td class="p-3 text-gray-600">${well.Latitude || 'N/A'}</td>
            <td class="p-3 text-gray-600">${well.Longitude || 'N/A'}</td>
            <td class="p-3 text-xs font-medium text-slate-700">${well["Rehab Status"]}</td>
            <td class="p-3 text-xs font-mono text-gray-600"><code>${well["Flow Meter Connection"]}</code></td>
            <td class="p-3 text-center">
                <button onclick="openGlobalRowEdit('well', ${index})" class="text-blue-600 hover:text-blue-900 font-medium text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded">
                    <i class="fa-solid fa-pen"></i> Edit
                </button>
            </td>
        `;
        wellsBody.appendChild(row);
    });

    // 2. METERS REGISTRY BINDING
    const metersBody = document.getElementById('table-meters-body');
    metersBody.innerHTML = '';
    
    appMeters.forEach((meter, index) => {
        if (!meter["Meter Serial Number"].toLowerCase().includes(meterSearchQuery)) return;
        
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50 transition border-b";
        row.innerHTML = `
            <td class="p-3 font-mono font-bold text-slate-800">${meter["Meter Serial Number"]}</td>
            <td class="p-3">
                <span class="px-2 py-1 text-xs font-bold rounded-full ${meter["Status Condition"] === 'Working' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                    ${meter["Status Condition"]}
                </span>
            </td>
            <td class="p-3 text-xs text-gray-600">${meter["Meter Type"]}</td>
            <td class="p-3 text-xs text-slate-700 font-semibold">Well Ref: ${meter["Initial Reading"]}</td>
            <td class="p-3 text-center">
                <button onclick="openGlobalRowEdit('meter', ${index})" class="text-blue-600 hover:text-blue-900 font-medium text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded">
                    <i class="fa-solid fa-pen"></i> Edit
                </button>
            </td>
        `;
        metersBody.appendChild(row);
    });
}

// NAVIGATION SYSTEM 
function switchTab(tabId) {
    document.querySelectorAll('.sidebar-link').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
    
    document.getElementById('screen-dashboard').classList.add('hidden');
    document.getElementById('screen-wells').classList.add('hidden');
    document.getElementById('screen-meters').classList.add('hidden');
    document.getElementById('screen-actions').classList.add('hidden');
    
    document.getElementById(`screen-${tabId}`).classList.remove('hidden');
    
    // Dynamic top bar page headings
    const headings = { 'dashboard': 'Operational Dashboard', 'wells': 'Wells Infrastructure Directory', 'meters': 'Electrical Power Meters Registry', 'actions': 'Operational Tools & Records Data Input' };
    document.getElementById('page-title').innerText = headings[tabId];
    
    if (tabId === 'dashboard' && mapInstance) {
        setTimeout(() => mapInstance.invalidateSize(), 150);
    }
}

// TABULATED CSV ENGINE DATASHEET EXPORT
function exportTableToCSV(type) {
    let csvContent = "";
    if (type === 'wells') {
        csvContent += "Well ID,Status,Latitude,Longitude,Rehab Status,Flow Meter Connection\n";
        appWells.forEach(w => {
            csvContent += `"${w["Well ID"]}","${w.Status}",${w.Latitude},${w.Longitude},"${w["Rehab Status"]}","${w["Flow Meter Connection"]}"\n`;
        });
    } else {
        csvContent += "Meter Serial Number,Status Condition,Meter Type,Connected Well No\n";
        appMeters.forEach(m => {
            csvContent += `"${m["Meter Serial Number"]}","${m["Status Condition"]}","${m["Meter Type"]}","${m["Initial Reading"]}"\n`;
        });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `ADVACON_${type}_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// PREMIUM EXCEL .XLSX FILE IMPORT ENGINE PARSER
function handleExcelImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const feedbackEl = document.getElementById('upload-feedback');
    feedbackEl.className = "text-xs font-semibold p-3 rounded-lg bg-blue-50 text-blue-800 block";
    feedbackEl.innerText = "Parsing spreadsheet workbook channels...";
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Process 'Wells' Sheet dynamically
            if (workbook.Sheets['Wells']) {
                const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets['Wells'], { header: 1 });
                // Locate header row matching structure index
                let startRow = 0;
                for (let r = 0; r < sheetJson.length; r++) {
                    if (sheetJson[r] && sheetJson[r].includes('Latitude')) { startRow = r; break; }
                }
                
                const rawRecords = XLSX.utils.sheet_to_json(workbook.Sheets['Wells'], { range: startRow });
                if (rawRecords.length > 0) {
                    appWells = rawRecords.map((row, i) => {
                        let idVal = row['Z'] || row['Well ID'] || String(i+1);
                        if (typeof idVal === 'number') idVal = String(idVal).padStart(3, '0');
                        return {
                            "Well ID": idVal.startsWith('WELL-') ? idVal : 'WELL-' + idVal,
                            "Status": String(row['Well Status'] || row['Status'] || 'Active').trim(),
                            "Latitude": parseFloat(row['Latitude']) || 26.5,
                            "Longitude": parseFloat(row['Longitude']) || 38.0,
                            "Rehab Status": row['Rehablitation Status'] || row['Rehab Status'] || 'Maintained',
                            "Flow Meter Connection": String(row['Connected Meter  '] || row['Connected Meter'] || row['Flow Meter Connection'] || 'None').trim()
                        };
                    });
                }
            }
            
            // Process 'Electrical Meter& Wells ' Sheet dynamically
            const meterSheetName = workbook.SheetNames.find(n => n.includes('Meter'));
            if (meterSheetName) {
                const rawMeters = XLSX.utils.sheet_to_json(workbook.Sheets[meterSheetName]);
                if (rawMeters.length > 0) {
                    appMeters = rawMeters.map(row => ({
                        "Meter Serial Number": String(row['E.Meter Serial Number'] || row['Meter Serial Number'] || '').trim(),
                        "Status Condition": String(row['Status'] || row['Status Condition'] || 'Working').trim(),
                        "Meter Type": row['Meter Type'] || 'Industrial Breakered',
                        "Initial Reading": String(row['Connected Well No.'] || row['Initial Reading'] || 'None').trim()
                    })).filter(m => m["Meter Serial Number"] !== 'undefined' && m["Meter Serial Number"] !== '');
                }
            }
            
            commitDataChangesState();
            feedbackEl.className = "text-xs font-semibold p-3 rounded-lg bg-emerald-50 text-emerald-800 block";
            feedbackEl.innerText = `Success! Reloaded ${appWells.length} Wells and ${appMeters.length} Electrical Meters from spreadsheet.`;
        } catch (error) {
            console.error(error);
            feedbackEl.className = "text-xs font-semibold p-3 rounded-lg bg-rose-50 text-rose-800 block";
            feedbackEl.innerText = "Error reading Excel layout. Verify column headers.";
        }
    };
    reader.readAsArrayBuffer(file);
}

// MODAL WINDOW ROW ROW RECORD EDIT COMPONENT
let activeEditScope = { type: null, index: null };

function openGlobalRowEdit(type, index) {
    activeEditScope = { type, index };
    const container = document.getElementById('modal-fields-container');
    container.innerHTML = '';
    
    if (type === 'well') {
        const well = appWells[index];
        container.innerHTML = `
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Well Identification ID</label><input type="text" id="edit-f1" value="${well["Well ID"]}" class="w-full border p-2 rounded-lg bg-gray-50 font-bold" readonly></div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Operational Asset Status</label><select id="edit-f2" class="w-full border p-2 rounded-lg"><option value="Active" ${well.Status==='Active'?'selected':''}>Active</option><option value="Non-Active" ${well.Status==='Non-Active'?'selected':''}>Non-Active</option></select></div>
            <div class="grid grid-cols-2 gap-2">
                <div><label class="block text-xs font-semibold text-gray-600 mb-1">Latitude</label><input type="number" step="any" id="edit-f3" value="${well.Latitude}" class="w-full border p-2 rounded-lg"></div>
                <div><label class="block text-xs font-semibold text-gray-600 mb-1">Longitude</label><input type="number" step="any" id="edit-f4" value="${well.Longitude}" class="w-full border p-2 rounded-lg"></div>
            </div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Infrastructure Rehab Status</label><input type="text" id="edit-f5" value="${well["Rehab Status"]}" class="w-full border p-2 rounded-lg"></div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Associated Flow Meter Serial Connection</label><input type="text" id="edit-f6" value="${well["Flow Meter Connection"]}" class="w-full border p-2 rounded-lg font-mono"></div>
        `;
    } else {
        const meter = appMeters[index];
        container.innerHTML = `
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Meter Serial Identifier</label><input type="text" id="edit-f1" value="${meter["Meter Serial Number"]}" class="w-full border p-2 rounded-lg bg-gray-50 font-mono font-bold" readonly></div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Status Condition</label><select id="edit-f2" class="w-full border p-2 rounded-lg"><option value="Working" ${meter["Status Condition"]==='Working'?'selected':''}>Working</option><option value="Not Working" ${meter["Status Condition"]==='Not Working'?'selected':''}>Not Working</option></select></div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Hardware Meter Module Type</label><input type="text" id="edit-f3" value="${meter["Meter Type"]}" class="w-full border p-2 rounded-lg"></div>
            <div><label class="block text-xs font-semibold text-gray-600 mb-1">Connected Well Cross Reference</label><input type="text" id="edit-f4" value="${meter["Initial Reading"]}" class="w-full border p-2 rounded-lg"></div>
        `;
    }
    
    const modal = document.getElementById('edit-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function saveGlobalEdit(event) {
    event.preventDefault();
    const { type, index } = activeEditScope;
    
    if (type === 'well') {
        appWells[index].Status = document.getElementById('edit-f2').value;
        appWells[index].Latitude = parseFloat(document.getElementById('edit-f3').value) || 0;
        appWells[index].Longitude = parseFloat(document.getElementById('edit-f4').value) || 0;
        appWells[index].["Rehab Status"] = document.getElementById('edit-f5').value;
        appWells[index].["Flow Meter Connection"] = document.getElementById('edit-f6').value;
    } else {
        appMeters[index]["Status Condition"] = document.getElementById('edit-f2').value;
        appMeters[index]["Meter Type"] = document.getElementById('edit-f3').value;
        appMeters[index]["Initial Reading"] = document.getElementById('edit-f4').value;
    }
    
    commitDataChangesState();
    closeEditModal();
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// COMMIT UPDATES & RE-BIND RENDER LOOPS
function commitDataChangesState() {
    localStorage.setItem('advacon_wells_data', JSON.stringify(appWells));
    localStorage.setItem('advacon_meters_data', JSON.stringify(appMeters));
    
    recalculateDashboardMetrics();
    renderAllTables();
    populateMapMarkers();
}

// INLINE FORM CREATION LOGIC HANDLER
function toggleFormType(type) {
    document.getElementById('entry-type').value = type;
    const wellBtn = document.getElementById('form-toggle-well');
    const meterBtn = document.getElementById('form-toggle-meter');
    
    if (type === 'well') {
        wellBtn.className = "px-3 py-1 text-xs font-bold rounded bg-blue-600 text-white";
        meterBtn.className = "px-3 py-1 text-xs font-bold rounded bg-gray-200 text-gray-700";
        document.getElementById('well-fields').classList.remove('hidden');
        document.getElementById('meter-fields').classList.add('hidden');
    } else {
        meterBtn.className = "px-3 py-1 text-xs font-bold rounded bg-blue-600 text-white";
        wellBtn.className = "px-3 py-1 text-xs font-bold rounded bg-gray-200 text-gray-700";
        document.getElementById('meter-fields').classList.remove('hidden');
        document.getElementById('well-fields').classList.add('hidden');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const type = document.getElementById('entry-type').value;
    
    if (type === 'well') {
        const wellId = document.getElementById('well-id').value.trim() || `WELL-${appWells.length + 1}`;
        appWells.unshift({
            "Well ID": wellId.startsWith('WELL-') ? wellId : 'WELL-' + wellId,
            "Status": document.getElementById('well-status').value,
            "Latitude": parseFloat(document.getElementById('well-lat').value) || 26.52,
            "Longitude": parseFloat(document.getElementById('well-lng').value) || 38.03,
            "Rehab Status": document.getElementById('well-rehab').value || "Completed",
            "Flow Meter Connection": "None"
        });
    } else {
        const serial = document.getElementById('meter-serial').value.trim();
        if(!serial) return alert('Meter Serial Number is required.');
        appMeters.unshift({
            "Meter Serial Number": serial,
            "Status Condition": document.getElementById('meter-condition').value,
            "Meter Type": document.getElementById('meter-type').value || "Mechanical Standard",
            "Initial Reading": "None"
        });
    }
    
    commitDataChangesState();
    event.target.reset();
    alert('Asset record saved into localized stack context.');
}

// PREMIUM EXECUTIVE SUMMARY REPORT EXPORT AS PDF
function exportToPDF() {
    const targetElement = document.getElementById('pdf-report-content');
    const pdfOptions = {
        margin: [10, 10, 10, 10],
        filename: `ADVACON_Executive_Summary_${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(pdfOptions).from(targetElement).save();
}