using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.Models
{
     interface IAbsenceRepository
    {
        IEnumerable<Absence> GetAllAbsence();
    }
}
