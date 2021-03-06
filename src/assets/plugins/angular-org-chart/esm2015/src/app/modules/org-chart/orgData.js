export class OrgEntity {
    constructor(orgStructure, parent) {
        this.parent = parent;
        const [name, ...reports] = orgStructure;
        this.name = name.split('(')[0].trim();
        const desigMatch = name.match(/\(([^)]+)\)/);
        this.type = desigMatch && desigMatch[1].trim();
        this.children = reports.map(r => r.substring(1))
            .reduce((previous, current) => {
            if (!current.startsWith(' ')) {
                previous.push([]);
            }
            previous[previous.length - 1].push(current);
            return previous;
        }, []).map(r => new OrgEntity(r, this));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItb3JnLWNoYXJ0LyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL29yZy1jaGFydC9vcmdEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU07SUFLTCxZQUFZLFlBQXNCLEVBQUUsTUFBa0I7UUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakIsQ0FBQyxFQUFjLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgT3JnRGF0YSB7XG5cdG5hbWU6IHN0cmluZztcblx0dHlwZTogc3RyaW5nO1xuXHRjaGlsZHJlbjogT3JnRGF0YVtdO1xufVxuXG5leHBvcnQgY2xhc3MgT3JnRW50aXR5IGltcGxlbWVudHMgT3JnRGF0YSB7XG5cdG5hbWU6IHN0cmluZztcblx0dHlwZTogc3RyaW5nO1xuXHRjaGlsZHJlbjogT3JnRW50aXR5W107XG5cdHBhcmVudD86IE9yZ0VudGl0eTtcblx0Y29uc3RydWN0b3Iob3JnU3RydWN0dXJlOiBzdHJpbmdbXSwgcGFyZW50PzogT3JnRW50aXR5KSB7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0Y29uc3QgW25hbWUsIC4uLnJlcG9ydHNdID0gb3JnU3RydWN0dXJlO1xuXHRcdHRoaXMubmFtZSA9IG5hbWUuc3BsaXQoJygnKVswXS50cmltKCk7XG5cdFx0Y29uc3QgZGVzaWdNYXRjaCA9IG5hbWUubWF0Y2goL1xcKChbXildKylcXCkvKTtcblx0XHR0aGlzLnR5cGUgPSBkZXNpZ01hdGNoICYmIGRlc2lnTWF0Y2hbMV0udHJpbSgpO1xuXG5cdFx0dGhpcy5jaGlsZHJlbiA9IHJlcG9ydHMubWFwKHIgPT4gci5zdWJzdHJpbmcoMSkpXG5cdFx0XHQucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoIWN1cnJlbnQuc3RhcnRzV2l0aCgnICcpKSB7XG5cdFx0XHRcdFx0cHJldmlvdXMucHVzaChbXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJldmlvdXNbcHJldmlvdXMubGVuZ3RoIC0gMV0ucHVzaChjdXJyZW50KTtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzO1xuXHRcdFx0fSwgPHN0cmluZ1tdW10+W10pLm1hcChyID0+IG5ldyBPcmdFbnRpdHkociwgdGhpcykpO1xuXHR9XG59XG4iXX0=