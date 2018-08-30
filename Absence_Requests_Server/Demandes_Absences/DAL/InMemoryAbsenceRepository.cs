using Demandes_Absences.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.DAL
{
    public class InMemoryAbsenceRepository : IAbsenceRepository
    {
        public List<Absence> absences = new List<Absence>()
            {
               new Absence() {Id = 1, EmissionDate=new DateTime(2018, 07, 31), StartDate=new DateTime(2018, 08, 16), EndDate=new DateTime(2018, 08, 20), Reason=Reason.LeaveFamilyEvents, Status=Status.Approved},
               new Absence() {Id = 2,EmissionDate=new DateTime(2018, 06, 25), StartDate=new DateTime(2018, 12, 26), EndDate=new DateTime(2018, 12, 28), Reason=Reason.PaidVacation, Status=Status.Refused},
               new Absence() {Id = 3,EmissionDate=new DateTime(2018, 05, 14), StartDate=new DateTime(2018, 05, 15), EndDate=new DateTime(2018, 05, 20), Reason=Reason.RTT, Status=Status.Refused},
               new Absence() {Id = 4,EmissionDate=new DateTime(2018, 04, 12), StartDate=new DateTime(2018, 04, 10), EndDate=new DateTime(2018, 04, 20), Reason=Reason.RTT, Status=Status.Approved},
               new Absence() {Id = 5,EmissionDate=new DateTime(2018, 04, 02), StartDate=new DateTime(2018, 04, 05), EndDate=new DateTime(2018, 04, 06), Reason=Reason.SickChild, Status=Status.Approved},
               new Absence() {Id = 6,EmissionDate=new DateTime(2018, 03, 03), StartDate=new DateTime(2018, 12, 06), EndDate=new DateTime(2018, 12, 08), Reason=Reason.LeaveFamilyEvents, Status=Status.InProgress},
               new Absence() {Id = 7,EmissionDate=new DateTime(2018, 07, 01), StartDate=new DateTime(2018, 07, 16), EndDate=new DateTime(2018, 07, 20), Reason=Reason.PaidVacation, Status=Status.Approved}
            };

        public IEnumerable<Absence> GetAllAbsence()
        {
            return absences;
        }
    }
}
