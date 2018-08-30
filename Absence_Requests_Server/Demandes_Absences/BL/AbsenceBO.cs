using Demandes_Absences.DAL;
using Demandes_Absences.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.BL
{
    public class AbsenceBO : IAbsenceBO
    {
        IAbsenceRepository absenceRepository = new InMemoryAbsenceRepository();

        public IEnumerable<Absence> GetAllAbsence()
        {
            return absenceRepository.GetAllAbsence();
        }

        public IEnumerable<Absence> SortByEmissionDate()
        {
            return absenceRepository.GetAllAbsence().OrderBy(n => n.EmissionDate);
        }
        public IEnumerable<Absence> SortByStartDate()
        {
            return absenceRepository.GetAllAbsence().OrderBy(n => n.StartDate);
        }

        public IEnumerable<Absence> FilterByReason(string reason)
        {
            return absenceRepository.GetAllAbsence().Where(n => n.Reason.ToString() == reason);
        }

        public IEnumerable<string> GetReasons()
        {
            return Enum.GetNames(typeof(Reason));
        }
    }
}
